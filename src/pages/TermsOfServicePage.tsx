import LegalDocument from "@/components/LegalDocument";
import { SITE } from "@/config/site";
import { Link } from "react-router-dom";

const TermsOfServicePage = () => {
  return (
    <LegalDocument title="Terms of Service">
      <section>
        <h2 className="mb-2 text-lg font-bold text-foreground">
          1. Agreement
        </h2>
        <p>
          These Terms of Service (&quot;Terms&quot;) govern your use of{" "}
          {SITE.name} at {SITE.url} (the &quot;Service&quot;). By accessing or
          using the Service, you agree to these Terms and our{" "}
          <Link to="/privacy" className="font-semibold text-brand hover:underline">
            Privacy Policy
          </Link>
          .
        </p>
        <p className="mt-3">
          If you do not agree, you must not use the Service.
        </p>
      </section>

      <section>
        <h2 className="mb-2 text-lg font-bold text-foreground">
          2. What {SITE.name} provides
        </h2>
        <p>
          {SITE.name} is a platform that connects customers with independent
          restaurants. We facilitate browsing menus, placing orders, and
          payments. Unless stated otherwise, {SITE.name} is not the restaurant
          and is not responsible for preparing food or physical delivery — those
          are provided by the restaurant you order from.
        </p>
      </section>

      <section>
        <h2 className="mb-2 text-lg font-bold text-foreground">
          3. Accounts
        </h2>
        <ul className="list-disc space-y-2 pl-5">
          <li>You must provide accurate registration and profile information.</li>
          <li>
            You are responsible for keeping your login credentials secure and
            for activity under your account.
          </li>
          <li>
            You must be old enough to enter a binding contract in your
            jurisdiction to use the Service.
          </li>
          <li>
            Restaurant managers must have authority to represent the business
            they register.
          </li>
        </ul>
      </section>

      <section>
        <h2 className="mb-2 text-lg font-bold text-foreground">
          4. Orders and payments
        </h2>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            When you place an order, you enter a contract with the restaurant
            for the food; {SITE.name} facilitates the transaction.
          </li>
          <li>
            Prices, delivery fees, and estimated times are set by restaurants
            and shown before checkout.
          </li>
          <li>
            Payment is processed by Stripe. By paying, you agree to Stripe&apos;s
            terms where applicable.
          </li>
          <li>
            Order confirmation and status updates are shown in your account.
            Delivery times are estimates, not guarantees.
          </li>
        </ul>
      </section>

      <section>
        <h2 className="mb-2 text-lg font-bold text-foreground">
          5. Cancellations and refunds
        </h2>
        <p>
          Cancellation and refund policies may depend on order status and the
          restaurant involved. Contact us at{" "}
          <a
            href={`mailto:${SITE.supportEmail}`}
            className="font-semibold text-brand hover:underline"
          >
            {SITE.supportEmail}
          </a>{" "}
          as soon as possible if there is a problem with your order. We will
          work with you and the restaurant to resolve issues fairly, subject to
          applicable law.
        </p>
      </section>

      <section>
        <h2 className="mb-2 text-lg font-bold text-foreground">
          6. Restaurant managers
        </h2>
        <p>If you register as a restaurant manager, you agree to:</p>
        <ul className="mt-2 list-disc space-y-2 pl-5">
          <li>Provide accurate restaurant, menu, and pricing information</li>
          <li>Honor orders placed through the platform when your restaurant is open</li>
          <li>Comply with food safety and business laws in your area</li>
          <li>
            Use customer order data only to fulfill orders, not for unrelated
            marketing without consent
          </li>
        </ul>
        <p className="mt-3">
          We may review, approve, suspend, or remove restaurant listings at our
          discretion.
        </p>
      </section>

      <section>
        <h2 className="mb-2 text-lg font-bold text-foreground">
          7. Acceptable use
        </h2>
        <p>You agree not to:</p>
        <ul className="mt-2 list-disc space-y-2 pl-5">
          <li>Use the Service for unlawful purposes or fraud</li>
          <li>Interfere with or disrupt the platform or other users</li>
          <li>Submit false orders, reviews, or restaurant information</li>
          <li>Scrape, copy, or reverse-engineer the Service without permission</li>
          <li>Harass restaurants, drivers, or other users</li>
        </ul>
      </section>

      <section>
        <h2 className="mb-2 text-lg font-bold text-foreground">
          8. Intellectual property
        </h2>
        <p>
          The {SITE.name} name, logo, software, and site content are owned by us
          or our licensors. Restaurants retain rights to their own menus, images,
          and branding. You may not use our trademarks without written
          permission.
        </p>
      </section>

      <section>
        <h2 className="mb-2 text-lg font-bold text-foreground">
          9. Disclaimers
        </h2>
        <p>
          THE SERVICE IS PROVIDED &quot;AS IS&quot; AND &quot;AS AVAILABLE.&quot;
          TO THE FULLEST EXTENT PERMITTED BY LAW, WE DISCLAIM WARRANTIES OF
          MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.
          WE DO NOT GUARANTEE UNINTERRUPTED OR ERROR-FREE OPERATION.
        </p>
        <p className="mt-3">
          Food quality, allergens, and preparation are the responsibility of
          the restaurant. Always inform restaurants of allergies or dietary
          needs when possible.
        </p>
      </section>

      <section>
        <h2 className="mb-2 text-lg font-bold text-foreground">
          10. Limitation of liability
        </h2>
        <p>
          TO THE MAXIMUM EXTENT PERMITTED BY LAW, {SITE.name.toUpperCase()} AND
          ITS OPERATORS SHALL NOT BE LIABLE FOR INDIRECT, INCIDENTAL, SPECIAL,
          CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR FOR LOST PROFITS, ARISING FROM
          YOUR USE OF THE SERVICE. OUR TOTAL LIABILITY FOR ANY CLAIM RELATING TO
          THE SERVICE SHALL NOT EXCEED THE AMOUNT YOU PAID TO US FOR THE
          RELEVANT ORDER IN THE THREE (3) MONTHS BEFORE THE CLAIM, OR ONE HUNDRED
          GHANA CEDIS (GHC 100), WHICHEVER IS GREATER, UNLESS REQUIRED OTHERWISE
          BY LAW.
        </p>
      </section>

      <section>
        <h2 className="mb-2 text-lg font-bold text-foreground">
          11. Termination
        </h2>
        <p>
          We may suspend or terminate your access if you violate these Terms or
          for operational reasons. You may stop using the Service at any time.
          Sections that by nature should survive (e.g. liability, disputes)
          will survive termination.
        </p>
      </section>

      <section>
        <h2 className="mb-2 text-lg font-bold text-foreground">
          12. Governing law
        </h2>
        <p>
          These Terms are governed by the laws of the Republic of Ghana, without
          regard to conflict-of-law rules. Disputes shall be subject to the
          exclusive jurisdiction of the courts of Ghana, unless mandatory
          consumer protection laws in your country require otherwise.
        </p>
      </section>

      <section>
        <h2 className="mb-2 text-lg font-bold text-foreground">
          13. Changes
        </h2>
        <p>
          We may modify these Terms at any time. We will post the updated Terms
          on this page. Material changes may be communicated via the site or
          email where appropriate. Continued use after changes constitutes
          acceptance.
        </p>
      </section>

      <section>
        <h2 className="mb-2 text-lg font-bold text-foreground">
          14. Contact
        </h2>
        <p>
          Questions about these Terms:{" "}
          <a
            href={`mailto:${SITE.supportEmail}`}
            className="font-semibold text-brand hover:underline"
          >
            {SITE.supportEmail}
          </a>
          .
        </p>
      </section>
    </LegalDocument>
  );
};

export default TermsOfServicePage;
