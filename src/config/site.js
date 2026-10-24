export const CONTACT_EMAIL = 'hello@hysache.com'
export const CONTACT_FORM_URL = import.meta.env.VITE_CONTACT_FORM_URL?.trim() ?? ''
export const WHATSAPP_URL = 'https://wa.me/918921801583'
export const GOOGLE_REVIEWS_URL = 'https://www.google.com/search?q=Hysache&utm_source=chatgpt.com#lrd=0x3b080dceb29ebf31:0x38c6fb734f861d3f,1,,,,'
export const GOOGLE_MAPS_URL = 'https://www.google.com/maps/place/Hysache/@10.0414267,76.3154177,17z/data=!3m1!4b1!4m6!3m5!1s0x3b080dceb29ebf31:0x38c6fb734f861d3f!8m2!3d10.0414267!4d76.3154177!16s%2Fg%2F11n43310wb'
export const INSTAGRAM_URL = 'https://www.instagram.com/hysache.india/'

export const MAIN_NAVIGATION = [    
    ['home', '/'],
    ['collection', '/collections'],
    ['craft', '/craft'],
    ['story', '/story'],
    ['gallery', '/gallery'],
]

export const FOOTER_SITEMAP = [
    ['Home', '/'],
    ['Collections', '/collections'],
    ['Craft', '/craft'],
    ['Story', '/story'],
    ['Gallery', '/gallery'],
    ['Contact', '/contact'],
]

export const FOOTER_VISIT = [
    ['Our Store', '/#store'],
    ['Directions', GOOGLE_MAPS_URL],
    ['Google Reviews', GOOGLE_REVIEWS_URL],
]
