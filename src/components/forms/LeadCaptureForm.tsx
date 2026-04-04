"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { leadFormSchema, LeadFormSchema } from "@/lib/validation/schemas";
import { extractUTMParams } from "@/lib/utm";
import { pushToDataLayer } from "@/lib/gtm";

export default function LeadCaptureForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [serverError, setServerError] = useState<string | null>(null);

  const { utmSource, utmCampaign } = extractUTMParams(searchParams);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LeadFormSchema>({
    resolver: zodResolver(leadFormSchema),
    defaultValues: {
      firstName: "",
      surname: "",
      idNumber: "",
      monthlyIncome: undefined,
      consentGiven: undefined,
      utmSource,
      utmCampaign,
    },
  });

  const onSubmit = async (data: LeadFormSchema) => {
    setServerError(null);
    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        setServerError(result.error || "Something went wrong. Please try again.");
        pushToDataLayer("lead_form_error", { error: result.error || "submission_failed" });
        return;
      }

      pushToDataLayer("lead_form_submit", { utm_source: utmSource, utm_campaign: utmCampaign });
      router.push(`/success?ref=${result.reference}`);
    } catch {
      setServerError("Unable to submit. Please check your connection and try again.");
    }
  };

  const inputClass =
    "w-full px-5 py-3.5 rounded-full bg-white text-gray-900 placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all";
  const errorClass = "mt-1.5 ml-4 text-xs text-red-400";

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3 w-full max-w-sm" noValidate>
      {serverError && (
        <div className="px-5 py-3 bg-red-500/20 border border-red-500/40 rounded-2xl text-sm text-red-300">
          {serverError}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <input
            className={inputClass}
            placeholder="First Name"
            maxLength={100}
            {...register("firstName")}
          />
          {errors.firstName && <p className={errorClass}>{errors.firstName.message}</p>}
        </div>
        <div>
          <input
            className={inputClass}
            placeholder="Surname"
            maxLength={100}
            {...register("surname")}
          />
          {errors.surname && <p className={errorClass}>{errors.surname.message}</p>}
        </div>
      </div>

      <div>
        <input
          className={inputClass}
          placeholder="SA ID Number (13 digits)"
          maxLength={13}
          inputMode="numeric"
          {...register("idNumber")}
        />
        {errors.idNumber && <p className={errorClass}>{errors.idNumber.message}</p>}
      </div>

      <div className="relative">
        <span className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 text-sm font-medium pointer-events-none">
          R
        </span>
        <input
          className={`${inputClass} pl-9`}
          placeholder="Monthly Income"
          type="number"
          step="0.01"
          min="0"
          {...register("monthlyIncome", { valueAsNumber: true })}
        />
        {errors.monthlyIncome && <p className={errorClass}>{errors.monthlyIncome.message}</p>}
      </div>

      <div className="flex items-start gap-3 px-2 pt-1">
        <input
          id="consent"
          type="checkbox"
          className="mt-0.5 h-4 w-4 rounded border-gray-600 text-blue-500 focus:ring-blue-500 bg-white/10 shrink-0"
          {...register("consentGiven")}
        />
        <label htmlFor="consent" className="text-xs text-gray-400 leading-relaxed cursor-pointer">
          I consent to the processing of my personal information in accordance with{" "}
          <a href="#" className="text-blue-400 hover:underline">POPIA</a> and the{" "}
          <a href="#" className="text-blue-400 hover:underline">Privacy Policy</a>.
        </label>
      </div>
      {errors.consentGiven && (
        <p className="ml-2 text-xs text-red-400">{errors.consentGiven.message}</p>
      )}

      <div className="pt-1">
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex items-center gap-3 px-7 py-3.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm transition-colors disabled:opacity-60 shadow-lg shadow-blue-900/40"
        >
          {isSubmitting ? (
            <>
              <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Processing...
            </>
          ) : (
            <>
              Send
              <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </>
          )}
        </button>
      </div>
    </form>
  );
}
