import LegalDocument from "@/components/LegalDocument";
import { SITE } from "@/config/site";

const PrivacyPolicyPage = () => {
  return (
    <LegalDocument title="Privacy Policy">
      <section>
        <h2 className="mb-2 text-lg font-bold text-foreground">
          1. Introduction
        </h2>
        <p>
          {SITE.name} (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;) operates{" "}
          {SITE.url} and helps customers discover local restaurants, place food
          orders, and track delivery. This Privacy Policy explains what
          information we collect, how we use it, and the choices you have.
        </p>
        <p className="mt-3">
          By using {SITE.name}, you agree to the collection and use of
          information as described here. If you do not agree, please do not use
          the service.
        </p>
      </section>

      <section>
        <h2 className="mb-2 text-lg font-bold text-foreground">
          2. Information we collect
        </h2>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            <strong>Account information</strong> — When you sign up or log in
            (via our authentication provider), we receive your email address and
            account identifier. You may also provide your name, delivery
            address, city, country, and phone number in your profile.
          </li>
          <li>
            <strong>Order information</strong> — Items ordered, restaurant
            chosen, delivery details, order status, and order history.
          </li>
          <li>
            <strong>Payment information</strong> — Payments are processed by{" "}
            <strong>Stripe</strong>. We do not store your full card number on
            our servers. Stripe handles payment data according to its own
            privacy policy.
          </li>
          <li>
            <strong>Restaurant manager data</strong> — If you register as a
            restaurant manager, we collect business details you submit (restaurant
            name, location, menu, images, opening hours).
          </li>
          <li>
            <strong>Technical data</strong> — Browser type, device information,
            and usage data needed to run and secure the app (e.g. session
            tokens stored locally for login).
          </li>
          <li>
            <strong>Preferences</strong> — Theme choice (light/dark) and
            favorites you save may be stored in your account or browser.
          </li>
        </ul>
      </section>

      <section>
        <h2 className="mb-2 text-lg font-bold text-foreground">
          3. How we use your information
        </h2>
        <ul className="list-disc space-y-2 pl-5">
          <li>Create and manage your account</li>
          <li>Process orders and payments</li>
          <li>Share order details with the restaurant fulfilling your order</li>
          <li>Send order confirmations and status updates (email/SMS where enabled)</li>
          <li>Improve the platform and customer support</li>
          <li>Prevent fraud and enforce our Terms of Service</li>
          <li>Comply with legal obligations</li>
        </ul>
      </section>

      <section>
        <h2 className="mb-2 text-lg font-bold text-foreground">
          4. How we share information
        </h2>
        <p>We may share information with:</p>
        <ul className="mt-2 list-disc space-y-2 pl-5">
          <li>
            <strong>Restaurants</strong> — Name, contact, delivery address, and
            order contents so they can prepare and deliver your food.
          </li>
          <li>
            <strong>Service providers</strong> — Including authentication
            (Auth0), payment processing (Stripe), hosting, and email/SMS
            providers that help us operate {SITE.name}.
          </li>
          <li>
            <strong>Legal requirements</strong> — When required by law or to
            protect rights, safety, and security.
          </li>
        </ul>
        <p className="mt-3">
          We do not sell your personal information to third parties for their
          marketing purposes.
        </p>
      </section>

      <section>
        <h2 className="mb-2 text-lg font-bold text-foreground">
          5. Data retention
        </h2>
        <p>
          We keep account and order data for as long as your account is active
          or as needed to provide the service, resolve disputes, and meet legal
          requirements. You may request deletion of your account by contacting
          us; some records (e.g. payment or tax-related) may be retained as
          required by law.
        </p>
      </section>

      <section>
        <h2 className="mb-2 text-lg font-bold text-foreground">
          6. Security
        </h2>
        <p>
          We use industry-standard measures to protect your data, including
          encrypted connections (HTTPS) and secure authentication. No method of
          transmission over the internet is 100% secure; we cannot guarantee
          absolute security.
        </p>
      </section>

      <section>
        <h2 className="mb-2 text-lg font-bold text-foreground">
          7. Your rights and choices
        </h2>
        <p>Depending on applicable law, you may have the right to:</p>
        <ul className="mt-2 list-disc space-y-2 pl-5">
          <li>Access or update your profile information in the app</li>
          <li>Request a copy or deletion of your personal data</li>
          <li>Withdraw consent where processing is based on consent</li>
          <li>Object to or restrict certain processing</li>
        </ul>
        <p className="mt-3">
          To exercise these rights, email{" "}
          <a
            href={`mailto:${SITE.supportEmail}`}
            className="font-semibold text-brand hover:underline"
          >
            {SITE.supportEmail}
          </a>
          .
        </p>
      </section>

      <section>
        <h2 className="mb-2 text-lg font-bold text-foreground">
          8. Cookies and local storage
        </h2>
        <p>
          We use browser storage for login sessions, theme preferences, and
          similar features. You can clear cookies and local storage in your
          browser settings; doing so may sign you out or reset preferences.
        </p>
      </section>

      <section>
        <h2 className="mb-2 text-lg font-bold text-foreground">
          9. Children
        </h2>
        <p>
          {SITE.name} is not intended for children under 13 (or the minimum age
          in your jurisdiction). We do not knowingly collect data from children.
        </p>
      </section>

      <section>
        <h2 className="mb-2 text-lg font-bold text-foreground">
          10. Changes to this policy
        </h2>
        <p>
          We may update this Privacy Policy from time to time. We will post the
          revised version on this page and update the &quot;Last updated&quot;
          date. Continued use after changes means you accept the updated policy.
        </p>
      </section>

      <section>
        <h2 className="mb-2 text-lg font-bold text-foreground">
          11. Contact
        </h2>
        <p>
          For privacy questions or requests, contact{" "}
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

export default PrivacyPolicyPage;
