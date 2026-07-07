import React, { useEffect, useState } from "react";
import api from "../api/axios";
import {
  CreditCard,
  Wallet,
  BookOpen,
  ShieldCheck,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Loader2,
} from "lucide-react";

export default function Payment() {
  const [student, setStudent] = useState(null);
  const [payments, setPayments] = useState([]);

  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(null);

  const [message, setMessage] = useState("");
  const [selectedMethod, setSelectedMethod] = useState("card");

  useEffect(() => {
    loadPaymentData();
  }, []);

  async function loadPaymentData() {
    setLoading(true);

    try {
      const [paymentRes, /*studentRes*/] = await Promise.all([
        api.get("/payments/me"), // make get request to payment api endpoint
        //api.get("/payments/me/invoice"),
      ]);
      //console.log(studentRes)
      //setStudent(studentRes.data);
      setPayments(paymentRes.data || []);
    } catch (error) {
      console.error(error);

      setMessage(
        error.response?.data?.message ||
          "Unable to load payment information."
      );
    } finally {
      setLoading(false);
    }
  }

  async function handlePayment(enrollment) {
    setProcessing(enrollment.id);
    setMessage("");

    try {
      const response = await api.post("/payments", {
        enrollment_id: enrollment.id,
        payment_method: selectedMethod,
      });

      /**
       * Backend can return:
       *
       * {
       *   payment_url:"https://..."
       * }
       *
       * OR
       *
       * {
       *   status:"paid"
       * }
       */

      if (response.data.payment_url) {
        window.location.href = response.data.payment_url;
        return;
      }

      setMessage("Payment completed successfully.");

      loadPaymentData();
    } catch (error) {
      setMessage(
        error.response?.data?.message ||
          "Payment could not be completed."
      );
    } finally {
      setProcessing(null);
    }
  }

  const totalOutstanding = payments.reduce(
    (sum, item) => sum + Number(item.amount),
    0
  );

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

  return (
    <div className="min-h-screen bg-slate-50">

      <div className="mx-auto max-w-7xl px-6 py-10">

        <div className="mb-10 text-center">

          <h1 className="text-4xl font-extrabold text-slate-900">
            Payment Center
          </h1>

          <p className="mt-2 text-slate-600">
            Complete payment for your enrolled courses.
          </p>

        </div>

        {message && (
          <div className="mb-8 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-emerald-700">
            {message}
          </div>
        )}

        <div className="mx-auto max-w-4xl">
           {/* PENDING PAYMENTS */}

          <div>

            {payments.length === 0 ? (

              <div className="rounded-3xl bg-white p-12 text-center shadow">

                <CheckCircle2
                  className="mx-auto text-emerald-500"
                  size={60}
                />

                <h2 className="mt-6 text-2xl font-bold">
                  No Pending Payments
                </h2>

                <p className="mt-2 text-slate-500">
                  You have successfully completed payment for all enrolled
                  courses.
                </p>

              </div>

            ) : (

              <>

                <div className="rounded-3xl bg-white p-8 shadow">

                  <div className="mb-8 text-center">

                    <div>

                      <h2 className="text-3xl font-bold">
                        Pending Course Payments
                      </h2>

                      <p className="mt-2 text-slate-500">
                        Complete payment to activate your enrolled courses.
                      </p>

                    </div>

                    <div className="mx-auto mt-6 w-fit rounded-xl bg-red-50 px-6 py-4">

                      <p className="text-sm text-slate-500">
                        Outstanding
                      </p>

                      <p className="text-3xl font-bold text-red-600">
                        ₦{totalOutstanding.toLocaleString()}
                      </p>

                    </div>

                  </div>

                  <div className="space-y-6">

                    {payments.map((payment) => (

                      <div
                        key={payment.id}
                        className="rounded-2xl border p-6"
                      >

                        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

                          <div>

                            <div className="flex items-center gap-3">

                              <BookOpen className="text-emerald-600" />

                              <h3 className="text-xl font-bold">
                                {payment.title}
                              </h3>

                            </div>

                            <div className="mt-4 space-y-2">

                              <p className="text-slate-500">
                                Duration:
                                <span className="ml-2 font-medium text-slate-700">
                                  {payment.duration}
                                </span>
                              </p>

                              <p className="text-slate-500">
                                Amount:
                                <span className="ml-2 font-bold text-emerald-600">
                                  ₦{Number(payment.price).toLocaleString()}
                                </span>
                              </p>

                              <div className="mt-3">

                                <span className="rounded-full bg-yellow-100 px-3 py-1 text-sm font-medium text-yellow-700">
                                  {payment.status}
                                </span>

                              </div>

                            </div>

                          </div>

                          <button
                            disabled={processing === payment.id}
                            onClick={() => handlePayment(payment)}
                            className="flex items-center justify-center gap-2 rounded-xl bg-emerald-500 px-8 py-4 font-semibold text-white transition hover:bg-emerald-600 disabled:cursor-not-allowed disabled:opacity-70"
                          >

                            {processing === payment.id ? (
                              <>
                                <Loader2
                                  size={18}
                                  className="animate-spin"
                                />
                                Processing...
                              </>
                            ) : (
                              <>
                                Pay Now
                                <ArrowRight size={18} />
                              </>
                            )}

                          </button>

                        </div>

                      </div>

                    ))}

                  </div>

                </div>

                <div className="mt-8 rounded-3xl bg-white p-8 shadow">

                  <h2 className="mb-6 text-2xl font-bold">
                    Order Summary
                  </h2>

                  <div className="space-y-5">

                    {payments.map((payment) => (

                      <div
                        key={payment.id}
                        className="flex justify-between"
                      >

                        <span>{payment.course}</span>

                        <span className="font-semibold">
                          ₦{Number(payment.amount).toLocaleString()}
                        </span>

                      </div>

                    ))}

                    <hr />

                    <div className="flex justify-between text-2xl font-bold">

                      <span>Total Outstanding</span>

                      <span className="text-emerald-600">
                        ₦{totalOutstanding.toLocaleString()}
                      </span>

                    </div>

                  </div>

                  <div className="mt-8 flex items-center gap-2 text-sm text-slate-500">

                    <ShieldCheck
                      size={18}
                      className="text-emerald-600"
                    />

                    Secure payment powered by your payment gateway.

                  </div>

                </div>

              </>

            )}

          </div>

        </div>

              </div>

    </div>
  );
}