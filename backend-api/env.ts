// import { createEnv } from "@t3-oss/env-nextjs";
// import { z } from "zod";

// export const env = createEnv({
//   /*
//    * Serverside Environment variables, not available on the client.
//    * Will throw if you access these variables on the client.
//    */
//   server: {
//     REPLICATE_API_KEY: z.string().min(1),
//   },
//   /*
//    * Environment variables available on the client (and server).
//    *
//    * 💡 You'll get type errors if these are not prefixed with NEXT_PUBLIC_.
//    */
//   client: {},
//   // For Next.js >= 13.4.4, you only need to destructure client variables:
//   // experimental__runtimeEnv: {
//   //   NEXT_PUBLIC_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_PUBLISHABLE_KEY,
//   // }
// });
