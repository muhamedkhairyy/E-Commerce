
export const validationForm = (product:{title:string, description:string, price:string, imageURL:string, tempColor:string[]}) => {
    const errors:{title:string, description:string, price:string, imageURL:string, colors:string} = {
        title: '',
        description: '',
        imageURL: '',
        price: '',
        colors: ''
    }
    const validUrl = /^(ftp|http|https):\/\/[^ "]+$/.test(product.imageURL);

if(!product.title.trim() || product.title.length < 10 || product.title.length > 80){
    errors.title = 'Product title must be between 10 and 80 characters'
}
if(!product.description.trim() || product.description.length < 10 || product.description.length > 80){
    errors.description = 'Product title must be between 10 and 80 characters'
}
if(!product.imageURL.trim() || !validUrl){
    errors.imageURL = 'imageURL is required'
}
if(!product.price.trim() || isNaN(Number(product.price))){
    errors.price = 'price is required'
}
if(!product.tempColor.length){
    errors.colors = 'select one at least'
}
 return errors
}