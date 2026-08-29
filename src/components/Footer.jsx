import { Mail, Phone, MapPin, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer
      className="
        relative
        w-full
        overflow-hidden
        rounded-t-[38px]
        border-t-2
        bg-gradient-to-br
        from-[#050f20]

        to-[#1d6ea8]
        text-white
      "
    >
      {/* Background glow */}
      <div className="pointer-events-none absolute -right-32 -top-32 h-80 w-80 rounded-full bg-blue-400/15 blur-[100px]" />

      <div className="pointer-events-none absolute -bottom-40 left-1/4 h-72 w-72 rounded-full bg-sky-400/10 blur-[100px]" />

      <div className="relative mx-auto max-w-7xl px-6 py-12 sm:px-8 lg:py-14">

        {/* ================= TOP ================= */}

        <div className="grid gap-10 lg:grid-cols-[1.4fr_0.7fr_1fr]">

          {/* Brand */}
          <div className="max-w-md">

            <Link to="/" className="inline-flex items-center gap-3">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-lg">
                <img
                  src="/aiipl-logo.png"
                  alt="AIIPL Logo"
                  className="h-12 w-12 object-contain"
                />
              </div>

              <div>
                <div className="text-lg font-semibold tracking-tight text-white">
                  Anubhav Infotech
                </div>

                <div className="text-[11px] text-blue-200">
                  Modern Infrastructure Solutions
                </div>
              </div>
            </Link>

            <p className="mt-5 text-sm leading-6 text-blue-100/70">
              Modern infrastructure solutions designed to deliver
              performance, reliability and scalability for your business.
            </p>

            {/* Small trust text */}
            {/* <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-[11px] text-blue-200/60">
              <span>Quality Hardware</span>
              <span>•</span>
              <span>Expert Support</span>
              <span>•</span>
              <span>Reliable Solutions</span>
            </div> */}
          </div>


          {/* Quick Links */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.15em] text-white">
              Quick Links
            </h3>

            <div className="mt-5 flex flex-col gap-3">

              <Link
                to="/"
                className="w-fit text-sm text-blue-100/70 transition-colors hover:text-white"
              >
                Home
              </Link>

              <Link
                to="/products"
                className="w-fit text-sm text-blue-100/70 transition-colors hover:text-white"
              >
                Products
              </Link>

              <Link
                to="/build-pc"
                className="w-fit text-sm text-blue-100/70 transition-colors hover:text-white"
              >
                Build Your PC
              </Link>

              <Link
                to="/about"
                className="w-fit text-sm text-blue-100/70 transition-colors hover:text-white"
              >
                About Us
              </Link>

              <Link
                to="/contact"
                className="w-fit text-sm text-blue-100/70 transition-colors hover:text-white"
              >
                Contact
              </Link>

            </div>
          </div>


          {/* Contact */}
          <div>

            <h3 className="text-xs font-semibold uppercase tracking-[0.15em] text-white">
              Get in touch
            </h3>

            <div className="mt-5 space-y-3">

              <div className="flex items-center gap-3 text-sm text-blue-100/70">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/10">
                  <Mail className="h-3.5 w-3.5" />
                </div>

                <span>info@aipl.com</span>
              </div>


              <div className="flex items-center gap-3 text-sm text-blue-100/70">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/10">
                  <Phone className="h-3.5 w-3.5" />
                </div>

                <span>+91 98765 43210</span>
              </div>


              <div className="flex items-center gap-3 text-sm text-blue-100/70">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/10">
                  <MapPin className="h-3.5 w-3.5" />
                </div>

                <span>India</span>
              </div>

            </div>


            {/* Contact button */}
            <Link
              to="/contact"
              className="
                mt-5
                inline-flex
                items-center
                gap-2
                rounded-full
                bg-white
                px-4
                py-2.5
                text-xs
                font-semibold
                text-blue-700
                transition-all
                duration-300
                hover:-translate-y-0.5
                hover:bg-blue-50
              "
            >
              Talk to us
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>

          </div>

        </div>


        {/* ================= DIVIDER ================= */}

        <div className="my-10 h-px bg-white/10" />


        {/* ================= BOTTOM ================= */}

        <div className="flex flex-col gap-4 text-xs text-blue-100/50 sm:flex-row sm:items-center sm:justify-between">

          <p>
            © {new Date().getFullYear()} Anubhav Infotech India Pvt. Ltd.
            All rights reserved.
          </p>

          <div className="flex items-center gap-5">

            <Link
              to="/privacy"
              className="transition-colors hover:text-white"
            >
              Privacy Policy
            </Link>

            <Link
              to="/terms"
              className="transition-colors hover:text-white"
            >
              Terms
            </Link>

          </div>

        </div>

      </div>
    </footer>
  );
}