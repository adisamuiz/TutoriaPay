import React from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  BookOpen,
  CreditCard,
  ShieldCheck,
  Wallet,
  GraduationCap,
  CheckCircle,
} from "lucide-react";

export default function Home() {
  return (
    <main className="bg-slate-50">

      {/* HERO */}
      <section id="hero" className="relative overflow-hidden bg-gradient-to-br from-emerald-50 via-white to-blue-50">

        <div className="absolute top-0 left-0 h-72 w-72 rounded-full bg-emerald-200 blur-3xl opacity-30"></div>
        <div className="absolute right-0 bottom-0 h-96 w-96 rounded-full bg-blue-200 blur-3xl opacity-30"></div>

        <div className="relative mx-auto max-w-7xl px-6 py-24">

          <div className="grid items-center gap-14 lg:grid-cols-2">

            {/* LEFT */}

            <div>

              <span className="inline-flex items-center rounded-full bg-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-700">
                Secure Student Payments Powered by Nomba
              </span>

              <h1 className="mt-8 text-5xl font-extrabold leading-tight text-slate-900 lg:text-6xl">
                Learn.
                <span className="text-emerald-600"> Pay.</span>
                <br />
                Grow.
              </h1>

              <p className="mt-6 text-lg leading-8 text-slate-600">
                TutoriaPay simplifies education by bringing together course
                enrollment, tuition payments, virtual accounts, and student
                management into one secure platform.
              </p>

              <div className="mt-10 flex flex-wrap gap-4">

                <Link
                  to="/register"
                  className="inline-flex items-center rounded-xl bg-emerald-500 px-7 py-4 font-semibold text-white shadow-lg transition hover:-translate-y-1 hover:bg-emerald-600"
                >
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>

                <Link
                  to="/courses"
                  className="rounded-xl border border-slate-300 bg-white px-7 py-4 font-semibold text-slate-700 transition hover:border-emerald-500 hover:text-emerald-600"
                >
                  Browse Courses
                </Link>

              </div>

              <div className="mt-10 flex flex-wrap gap-6 text-sm text-slate-600">

                <div className="flex items-center gap-2">
                  <CheckCircle className="text-emerald-500" size={18} />
                  Secure Payments
                </div>

                <div className="flex items-center gap-2">
                  <CheckCircle className="text-emerald-500" size={18} />
                  Virtual Accounts
                </div>

                <div className="flex items-center gap-2">
                  <CheckCircle className="text-emerald-500" size={18} />
                  Student Dashboard
                </div>

              </div>

            </div>

            {/* RIGHT */}

            <div className="grid gap-5">

              <div className="rounded-3xl bg-white p-7 shadow-xl">

                <div className="flex items-center gap-4">

                  <div className="rounded-xl bg-emerald-100 p-3">
                    <Wallet className="text-emerald-600" />
                  </div>

                  <div>

                    <h3 className="font-bold text-slate-800">
                      Outstanding Fees
                    </h3>

                    <p className="text-3xl font-extrabold text-slate-900">
                      ₦120,000
                    </p>

                  </div>

                </div>

              </div>

              <div className="rounded-3xl bg-white p-7 shadow-xl">

                <div className="flex items-center gap-4">

                  <div className="rounded-xl bg-blue-100 p-3">
                    <CreditCard className="text-blue-600" />
                  </div>

                  <div>

                    <h3 className="font-bold text-slate-800">
                      Payment Status
                    </h3>

                    <p className="font-semibold text-emerald-600">
                      Ready to Pay
                    </p>

                  </div>

                </div>

              </div>

              <div className="rounded-3xl bg-white p-7 shadow-xl">

                <div className="flex items-center gap-4">

                  <div className="rounded-xl bg-emerald-100 p-3">
                    <BookOpen className="text-emerald-600" />
                  </div>

                  <div>

                    <h3 className="font-bold text-slate-800">
                      Active Courses
                    </h3>

                    <p className="text-3xl font-extrabold text-slate-900">
                      12
                    </p>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* STATS */}

      <section className="mx-auto max-w-7xl px-6 py-20">

        <div className="grid gap-8 rounded-3xl bg-white p-10 shadow-lg md:grid-cols-4">

          <div className="text-center">
            <h2 className="text-4xl font-extrabold text-emerald-600">
              5,000+
            </h2>
            <p className="mt-2 text-slate-600">Students</p>
          </div>

          <div className="text-center">
            <h2 className="text-4xl font-extrabold text-emerald-600">
              120+
            </h2>
            <p className="mt-2 text-slate-600">Courses</p>
          </div>

          <div className="text-center">
            <h2 className="text-4xl font-extrabold text-emerald-600">
              ₦40M+
            </h2>
            <p className="mt-2 text-slate-600">Payments Processed</p>
          </div>

          <div className="text-center">
            <h2 className="text-4xl font-extrabold text-emerald-600">
              98%
            </h2>
            <p className="mt-2 text-slate-600">Success Rate</p>
          </div>

        </div>

      </section>

      {/* FEATURES */}

      <section id="features" className="mx-auto max-w-7xl px-6 pb-24">

        <div className="text-center">

          <h2 className="text-4xl font-extrabold text-slate-900">
            Everything Students Need
          </h2>

          <p className="mt-4 text-lg text-slate-600">
            One platform to manage learning and payments.
          </p>

        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-3">

          <div className="rounded-3xl bg-white p-8 shadow-lg">

            <div className="mb-5 inline-flex rounded-xl bg-emerald-100 p-4">
              <CreditCard className="text-emerald-600" />
            </div>

            <h3 className="text-xl font-bold">
              Secure Payments
            </h3>

            <p className="mt-4 text-slate-600">
              Pay tuition securely using cards, bank transfers and virtual
              accounts.
            </p>

          </div>

          <div className="rounded-3xl bg-white p-8 shadow-lg">

            <div className="mb-5 inline-flex rounded-xl bg-blue-100 p-4">
              <GraduationCap className="text-blue-600" />
            </div>

            <h3 className="text-xl font-bold">
              Course Management
            </h3>

            <p className="mt-4 text-slate-600">
              Browse available courses and manage enrollments in one place.
            </p>

          </div>

          <div className="rounded-3xl bg-white p-8 shadow-lg">

            <div className="mb-5 inline-flex rounded-xl bg-emerald-100 p-4">
              <ShieldCheck className="text-emerald-600" />
            </div>

            <h3 className="text-xl font-bold">
              Trusted Infrastructure
            </h3>

            <p className="mt-4 text-slate-600">
              Built with security in mind to protect students and institutions.
            </p>

          </div>

        </div>

      </section>

      {/* CTA */}

      <section id="cta" className="bg-gradient-to-r from-emerald-600 to-blue-600 py-20">

        <div className="mx-auto max-w-4xl text-center text-white px-6">

          <h2 className="text-4xl font-extrabold">
            Ready to Start Your Learning Journey?
          </h2>

          <p className="mt-6 text-lg text-emerald-50">
            Join thousands of students already using TutoriaPay to enroll in
            courses and make secure payments.
          </p>

          <Link
            to="/register"
            className="mt-10 inline-block rounded-xl bg-white px-8 py-4 font-bold text-emerald-600 transition hover:scale-105"
          >
            Create Free Account
          </Link>

        </div>

      </section>

      {/* FOOTER */}

      <footer className="bg-slate-900 py-12 text-slate-300">

        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-6 md:flex-row">

          <div>

            <h2 className="text-2xl font-bold text-white">
              TutoriaPay
            </h2>

            <p className="mt-2">
              Secure learning and payments for modern education.
            </p>

          </div>

          <div className="flex gap-8">

            <Link to="/" className="hover:text-white">
              Home
            </Link>

            <Link to="/courses" className="hover:text-white">
              Courses
            </Link>

            <Link to="/login" className="hover:text-white">
              Login
            </Link>

            <Link to="/register" className="hover:text-white">
              Register
            </Link>

          </div>

        </div>

      </footer>

    </main>
  );
}