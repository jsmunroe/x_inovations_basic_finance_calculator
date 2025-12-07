# x_inovations_basic_finance_calculator

## Notes

I did not include the "Apply" button because I thought it would be a better user experience if the fields in the "Result" section just updated as values were typed into the form. 

I had finsihed the front-end, but because of the learning curve with Vue, I was running out of time. Therefore, I asked Claude Sonnet to help me with the back-end. I did check her work thuroughly though. I didn't not use her help for the front-end work at all.

I created an SVG file for the logo and attempted to match the font thereof as best I could. I found a free font called Goldman that matched it fairly well. 

## Front-end Structure

The application is made up of a main `App` component with three sections containing the `FinanceQuoteSection`, `ResultSection`, and `SaveQuotesSection` components. I added an `AppSection` component to wrap each of the sections in a header and border. 

I created `CurrencyInput`, `CurrencyView`, `TextInput`, and `UnitInput` components to handle the special needs of each of the field types used in this app. `CurrencyInput` handles formatting of number values and prevents having to store formatted strings entirely. `CurrencyView` is the same as `CurrencyInput` for a read-omly currency field. `UnitInput` is used for fields that end in a unit like months or percent. And `TextInput` was uses for the "Quote Name" field. 

I did not use any CSS libraries like Bootstrap or Material for this. I created all the CSS for this app myself except for some boilerplate CSS that Vite added to base.css.

## Setup Instructions

1. Install dependencies:
   ```bash
   npm install
   ```

2. Set up environment variables:
   ```bash
   cp .env.example .env
   ```
   
3. Configure your `.env` file with your settings

4. Set up the database:
   ```bash
   npm run db:generate
   npm run db:push
   ```

5. Start development server:
   ```bash
   npm run dev
   ```
