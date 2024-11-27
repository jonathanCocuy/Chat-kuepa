import { z } from "zod";
//creamos los schemas que se van a comprar con el reqboy luego en la peticion en este caso register y login
export const registerSchema = z.object({
  userName: z.string({
    required_error: "UserName is Required",
  }),
  email: z
    .string({
      required_error: "Email is required",
    })
    .email({
      message: "Invalid Email",
    }),
  password: z
    .string({
      required_error: "password is required",
    })
    .min(6, {
      message: "Password must be at least 6 characters",
    }),
});

export const loginSchema = z.object({
  email: z
    .string({
      required_error: "Email is required",
    })
    .email({
      message: "Invalid email",
    }),
  password: z
    .string({
      required_error: "Password is required",
    })
    .min(6, {
      message: "Password must be at least 6 characters",
    }),
});
