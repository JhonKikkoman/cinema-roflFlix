import { object, string } from 'yup';

export const singUpFormSchema = object({
  userName: string()
    .required('Поле обязательно к заполнению')
    .min(3, 'Имя должно состоять минимум из 3 символов'),
  email: string()
    .matches(
      /^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,}$/i,
      'Введите корректно почту  @ и .ru или .com',
    )
    .required('Поле обязательно к заполнению'),
  password: string()
    .trim()
    .required('Пороль обязательный для ввода')
    .min(6, 'Пароль должен состоять минимум из 6 симовлов'),
  confirm: string()
    .trim()
    .required('Должен совпадать с поролем')
    .when('password', ([password], schema) =>
      schema.equals([password], 'Должен совпадать с поролем'),
    ),
});
