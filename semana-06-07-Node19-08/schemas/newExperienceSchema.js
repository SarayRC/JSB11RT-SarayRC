//Joi sirve para hecer un filtrado de los datos obtenidos del re.body

const Joi = require('joi');

const newExperienceSchema = Joi.object().keys({
    name: Joi.string()
    .required()
    .min(3)
    .max(30)
    .regex(/[A-Za-z0-9]/)
    .error((errors) => {
        if (
            errors[0].code === 'any.required' ||
            errors[0].code === ' string.empty'
        ) {
            return new Error('El nombre es requerido');
        }
        return new Error ('La experiencia debe tener entre 3 y 30 caracteres'
        );
    })
}),

    price: Joi.number()
    .required()
    .min(1)
    .error((errors) => {
    if (
        errors[0].code === 'any.required' ||
        errors[0].code === 'string.empty'
    ) {
        return new Error('El precio es obligatorio');
    }
    return new Error ('El precio debe tener valor de minimo 1'
    );
})