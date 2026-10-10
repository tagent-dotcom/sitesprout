# Selling with Whop

[Whop](https://whop.com) sells digital products and subscriptions and handles
checkout, cards, taxes and payouts. The template embeds Whop's checkout on the
pricing page.

## 1. Create the product

1. whop.com > Dashboard > create a business, then a **product** (Access pass).
2. Add a **plan**: one-time or recurring, price, currency. Copy the plan id
   (`plan_...`). Check you copied the plan you want (monthly vs one-time).
3. Set `PUBLIC_WHOP_PLAN_ID=plan_...` locally and in Vercel. Until it is set,
   `WhopCheckout.astro` renders nothing, so no page points at a dead checkout.

## 2. The checkout on the site

`src/components/WhopCheckout.astro` loads Whop's embedded checkout:

```html
<div data-whop-checkout-plan-id="plan_..."></div>
<script async defer src="https://js.whop.com/static/checkout/loader.js"></script>
```

Without JavaScript it falls back to a link to Whop's hosted checkout. Check
the current embed options (theme, return URL, prefilled email) in
[Whop's docs](https://docs.whop.com) before launch; Whop updates them.

## 3. Unlock features after payment (when you need accounts)

A static site cannot know who paid on its own. When the paid plan must
unlock something on the site:

1. Add sign-in (for example Supabase Auth with Google).
2. Pass the user's id to the checkout as **metadata** so the payment can be
   matched to the account.
3. Create a **webhook** in Whop (Developer > Webhooks) pointing at a server
   function (a Supabase Edge Function or a Vercel function), listening to
   `membership.went_valid` and `membership.went_invalid` (or the payment
   events your plan needs).
4. In the function, **verify the webhook signature** with the webhook
   secret, then write the membership status (user id, status, valid until)
   to your database. Only the function writes it; the browser only reads
   "am I premium" for the signed-in user.
5. Test with a 100% discount code or Whop's test mode before going live.

Keep secrets (webhook secret, API keys) only in server environment
variables, never in `PUBLIC_*` variables or the repository.

## 4. Legal pages

- Mention Whop as the payment processor in the privacy policy (done in the template).
- Selling to consumers in the EU, Turkey or Japan can require extra seller
  information pages (for example Japan's 特定商取引法 page). Check the
  rules of each country you sell to.
