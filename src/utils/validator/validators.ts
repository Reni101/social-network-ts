export const requiredField = (value: string) => {
    if (value) return undefined
    return 'Field is required'

}
export const maxlength30 = (value: string) => {

    if (value && value.length > 30) return "Max length is 30 symbols"
    return undefined

}