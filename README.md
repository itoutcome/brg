Aplicatia este facuta cu:
Next.js, Tailwind, shadCn, Typescript, React Hook Form, Tanstack React Query

## Getting Started

Ca orice alta aplicatie Next...:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Deschideti [http://localhost:3000](http://localhost:3000) sa vezi produsul livrat.


Toata validarea am facut-o cu zod, nu cu yup, pentru ca zod este industry standard.
De asemenea am folosit React Hook Form, nu Formik.
Formik este o librarie care nu mai este mentinuta, deci ramane pentru legacy code.

Pentru pret am folosit precompletare cu delimitator la 3 cifre dupa standardul ro-ro
(Incercati sa adaugati un pret din 5 cifre si va primi automat forma 12.345)
Este identic si pentru EUR si pentru RON.

Preturile sunt extrase dintr-un obiect, iar tipul si schema de validare sunt construite din acesta
Poate fi adaugat, spre exemplu, USD in /src/lib/monezi, iar toate tipurile vor functiona in continuare.
Se va popula automat si dropdownlul.

Momentan datele sunt trimise si citite prin REST catre /api/ unde salvam datele intr-un obiect.
Folosim React Query, pentru ca nu avem motiv sa folosim useEffect si fetch in 2025.