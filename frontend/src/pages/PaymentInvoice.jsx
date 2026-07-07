import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api/axios";

import {
  Loader2,
  Receipt,
  BookOpen,
  User,
  CalendarDays,
  CreditCard,
  ArrowLeft,
  AlertCircle,
} from "lucide-react";

export default function PaymentInvoice() {
  const navigate = useNavigate();

  // payment id comes from route
  // /payment/invoice/:paymentId

  const { paymentId } = useParams();

  const [invoice, setInvoice] = useState(null);

  const [loading, setLoading] = useState(true);

  const [processing, setProcessing] = useState(false);

  const [message, setMessage] = useState("");

  useEffect(() => {
    loadInvoice();
  }, [paymentId]);

  async function loadInvoice() {
    setLoading(true);

    try {

      /*
      Backend endpoint

      GET /payments/:paymentId

      */

      const res = await api.get(`/payments/me/invoice`);

      setInvoice(res.data);

    } catch (error) {

      console.error(error);

      setMessage(
        error.response?.data?.message ||
          "Unable to load invoice."
      );

    } finally {

      setLoading(false);

    }
  }

  async function proceedToPayment() {

    if (!invoice) return;

    setProcessing(true);

    try {

      /*
      Backend endpoint

      POST /payments/:paymentId/pay

      Backend returns

      {
          payment_url:"https://..."
      }

      */

      const response = await api.post(
        `/payments/${paymentId}/pay`
      );

      if (response.data.payment_url) {

        window.location.href =
          response.data.payment_url;

        return;
      }

      if (response.data.status === "paid") {

        navigate("/dashboard");

        return;
      }

    } catch (error) {

      console.error(error);

      setMessage(
        error.response?.data?.message ||
          "Unable to start payment."
      );

    } finally {

      setProcessing(false);

    }
  }

  if (loading) {

    return (

      <div className="flex h-screen items-center justify-center">

        <Loader2
          className="animate-spin text-emerald-600"
          size={40}
        />

      </div>

    );

  }

  if (!invoice) {

    return (

      <div className="flex h-screen items-center justify-center">

        <div className="rounded-3xl bg-white p-10 shadow text-center">

          <AlertCircle
            size={60}
            className="mx-auto text-red-500"
          />

          <h2 className="mt-5 text-2xl font-bold">

            Invoice Not Found

          </h2>

          <button
            onClick={() => navigate(-1)}
            className="mt-6 rounded-xl bg-emerald-500 px-6 py-3 font-semibold text-white"
          >

            Go Back

          </button>

        </div>

      </div>

    );

  }

  return (

    <div className="min-h-screen bg-slate-100">

      <div className="mx-auto max-w-5xl px-6 py-10">

        <div className="mb-10 flex items-center justify-between">

          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 rounded-xl border bg-white px-5 py-3 hover:bg-slate-50"
          >

            <ArrowLeft size={18} />

            Back

          </button>

          <h1 className="flex items-center gap-3 text-4xl font-bold">

            <Receipt />

            Payment Invoice

          </h1>

          <div />

        </div>

        {message && (

          <div className="mb-8 rounded-xl border border-red-200 bg-red-50 p-4 text-red-600">

            {message}

          </div>

        )}

        <div className="rounded-3xl bg-white p-10 shadow">
                  {/* Header */}

          <div className="flex flex-col gap-6 border-b pb-8 md:flex-row md:items-center md:justify-between">

            <div>

              <h2 className="text-3xl font-bold text-slate-900">

                Invoice #{invoice.invoice_no}

              </h2>

              <p className="mt-2 text-slate-500">

                Review your invoice before proceeding to payment.

              </p>

            </div>

            <div>

              <span
                className={`rounded-full px-5 py-2 text-sm font-semibold capitalize ${
                  invoice.status === "paid"
                    ? "bg-emerald-100 text-emerald-700"
                    : invoice.status === "failed"
                    ? "bg-red-100 text-red-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >

                {invoice.status}

              </span>

            </div>

          </div>

          {/* Student & Course */}

          <div className="mt-10 grid gap-8 lg:grid-cols-2">

            <div className="rounded-2xl border p-6">

              <div className="mb-6 flex items-center gap-3">

                <User className="text-emerald-600" />

                <h3 className="text-xl font-bold">

                  Student Information

                </h3>

              </div>

              <div className="space-y-5">

                <div>

                  <p className="text-sm text-slate-500">

                    Full Name

                  </p>

                  <p className="font-semibold">

                    {invoice.student?.full_name}

                  </p>

                </div>

                <div>

                  <p className="text-sm text-slate-500">

                    Email

                  </p>

                  <p className="font-semibold">

                    {invoice.student?.email}

                  </p>

                </div>

                <div>

                  <p className="text-sm text-slate-500">

                    Phone

                  </p>

                  <p className="font-semibold">

                    {invoice.student?.phone}

                  </p>

                </div>

              </div>

            </div>

            <div className="rounded-2xl border p-6">

              <div className="mb-6 flex items-center gap-3">

                <BookOpen className="text-blue-600" />

                <h3 className="text-xl font-bold">

                  Course Details

                </h3>

              </div>

              <div className="space-y-5">

                <div>

                  <p className="text-sm text-slate-500">

                    Course

                  </p>

                  <p className="font-semibold">

                    {invoice.course?.title}

                  </p>

                </div>

                <div>

                  <p className="text-sm text-slate-500">

                    Duration

                  </p>

                  <p className="font-semibold">

                    {invoice.course?.duration}

                  </p>

                </div>

                <div>

                  <p className="text-sm text-slate-500">

                    Instructor

                  </p>

                  <p className="font-semibold">

                    {invoice.course?.instructor || "N/A"}

                  </p>

                </div>

              </div>

            </div>

          </div>

          {/* Invoice Summary */}

          <div className="mt-10 rounded-2xl border p-8">

            <h3 className="mb-8 text-2xl font-bold">

              Invoice Summary

            </h3>

            <div className="space-y-6">

              <div className="flex justify-between">

                <span className="text-slate-500">

                  Invoice Number

                </span>

                <span className="font-semibold">

                  {invoice.invoice_no}

                </span>

              </div>

              <div className="flex justify-between">

                <span className="text-slate-500">

                  Invoice Date

                </span>

                <span className="font-semibold">

                  {invoice.invoice_date}

                </span>

              </div>

              <div className="flex justify-between">

                <span className="text-slate-500">

                  Due Date

                </span>

                <span className="font-semibold">

                  {invoice.due_date}

                </span>

              </div>

              <div className="flex justify-between">

                <span className="text-slate-500">

                  Currency

                </span>

                <span className="font-semibold">

                  {invoice.currency || "NGN"}

                </span>

              </div>

              <div className="flex justify-between">

                <span className="text-slate-500">

                  Course Fee

                </span>

                <span className="font-semibold">

                  ₦{Number(invoice.amount).toLocaleString()}

                </span>

              </div>

              <hr />

              <div className="flex justify-between text-3xl font-bold">

                <span>

                  Total

                </span>

                <span className="text-emerald-600">

                  ₦{Number(invoice.amount).toLocaleString()}

                </span>

              </div>

            </div>

          </div>
                    {/* Actions */}

          <div className="mt-10 flex flex-col gap-4 border-t pt-8 md:flex-row md:items-center md:justify-between">

            <div className="flex items-center gap-3 text-slate-500">

              <CreditCard
                className="text-emerald-600"
                size={22}
              />

              <span>
                Payments are processed securely through the payment gateway.
              </span>

            </div>

            <div className="flex gap-4">

              <button
                onClick={() => navigate(-1)}
                className="rounded-xl border border-slate-300 px-6 py-3 font-semibold transition hover:bg-slate-100"
              >
                Back
              </button>

              <button
                disabled={
                  processing ||
                  invoice.status === "paid"
                }
                onClick={proceedToPayment}
                className="flex items-center gap-2 rounded-xl bg-emerald-600 px-8 py-3 font-semibold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
              >

                {processing ? (

                  <>
                    <Loader2
                      className="animate-spin"
                      size={18}
                    />

                    Processing...

                  </>

                ) : invoice.status === "paid" ? (

                  "Already Paid"

                ) : (

                  <>
                    Proceed To Payment

                    <CreditCard size={18} />
                  </>

                )}

              </button>

            </div>

          </div>

        </div>

      </div>

    </div>

  );

}

/*
=========================================================
BACKEND API CONTRACT
=========================================================

1. GET INVOICE

GET /payments/:paymentId

Response

{
  "id": 15,

  "invoice_no": "INV-20260707-00015",

  "invoice_date": "2026-07-07",

  "due_date": "2026-07-14",

  "currency": "NGN",

  "amount": 50000,

  "status": "pending",

  "student": {
      "id": 4,
      "full_name": "John Doe",
      "email": "john@example.com",
      "phone": "+2348012345678"
  },

  "course": {
      "id": 10,
      "title": "Frontend Development",
      "duration": "12 Weeks",
      "instructor": "Jane Smith"
  }
}

=========================================================

2. START PAYMENT

POST /payments/:paymentId/pay

Response

{
    "payment_url":
    "https://checkout.paystack.com/xxxxx"
}

OR

{
    "status":"paid"
}

=========================================================

3. PAYMENT CALLBACK

POST /payments/webhook

Backend updates payment

↓

Payment status becomes

Paid

↓

Dashboard payment history updates

↓

Student dashboard refreshes

=========================================================

RECOMMENDED FLOW

Dashboard

↓

Courses

↓

Enroll

↓

Payment Page
(list pending payments)

↓

Payment Invoice

↓

Proceed To Payment

↓

Payment Gateway

↓

Backend Callback

↓

Dashboard

=========================================================
*/