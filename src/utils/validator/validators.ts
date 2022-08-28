export const requiredField = (value: string) => {
    if (value) return undefined
    return 'Field is required'

}
export const maxlengthCreator = (maxlength: number) => (value: string) => {
    if (value && value.length > maxlength) return `Max length is ${maxlength} symbols`
    return undefined
}