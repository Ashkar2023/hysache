import editorialTwo from '../assets/images/collections/7-comp.jpg'
import collectionOne from '../assets/images/collections/1-comp.jpg'
import collectionTwo from '../assets/images/collections/2-comp.jpg'
import collectionThree from '../assets/images/collections/3-comp.jpg'
import collectionFour from '../assets/images/collections/4-comp.jpg'
import collectionFive from '../assets/images/collections/5.jpeg'
import collectionSix from '../assets/images/collections/6-comp.jpg'
import collectionSeven from '../assets/images/collections/rotated-1-comp.jpg'
import look11 from '../assets/images/collections/11.webp'
import look12 from '../assets/images/collections/12.webp'
import look13 from '../assets/images/collections/13.webp'
import look14 from '../assets/images/collections/14.webp'
import look15 from '../assets/images/collections/15.webp'
import look16 from '../assets/images/collections/16.webp'
import look17 from '../assets/images/collections/17.webp'
import look18 from '../assets/images/collections/18.webp'
import look19 from '../assets/images/collections/19.webp'
import look20 from '../assets/images/collections/20.webp'
import look21 from '../assets/images/collections/21.webp'
import look22 from '../assets/images/collections/22.webp'
import look23 from '../assets/images/collections/23.webp'
import look24 from '../assets/images/collections/24.webp'
import look25 from '../assets/images/collections/25.webp'
import look26 from '../assets/images/collections/26.webp'
import look27 from '../assets/images/collections/27.webp'
import look28 from '../assets/images/collections/28.webp'
import look29 from '../assets/images/collections/29.webp'

export const CATALOG_COLLECTIONS = [
    {
        id: 'the-day-edit',
        title: 'The Day Edit',
        description: 'Easy silhouettes made for unhurried days, grounded in soft colour and thoughtful detail.',
        products: [
            {
                id: 'day-edit-01',
                name: 'Mustard floral look, editorial view',
                image: "/hero.jpg",
                alt: 'Model wearing a flowing golden Hysache ensemble against a deep red backdrop',
                layout: 'wide-left',
                position: 'center',
            },
            {
                id: 'day-edit-02',
                name: 'Mustard floral look, full-length view',
                image: look13,
                alt: 'Model wearing a mustard floral Hysache ensemble with an olive border and matching trousers',
                layout: 'narrow-right',
                position: 'center 24%',
            },
            {
                id: 'day-edit-03',
                name: 'Red and ivory floral looks, seated view',
                image: collectionOne,
                alt: 'Two models wearing red and ivory floral Hysache ensembles in a warm interior',
                layout: 'narrow-right',
                position: 'center 32%',
            },
            {
                id: 'day-edit-04',
                name: 'Red and ivory floral looks, reclining view',
                image: collectionSeven,
                alt: 'Two models in red and ivory floral outfits beneath a chandelier',
                layout: 'wide-left',
                position: 'center 38%',
            },
            {
                id: 'day-edit-05',
                name: 'Red and ivory floral looks, portrait view',
                image: look11,
                alt: 'Two models wearing coordinating red and ivory floral Hysache ensembles beneath a chandelier',
                layout: 'full',
                position: 'center 34%',
            },
        ],
    },
    {
        id: 'evening-light',
        title: 'Evening Light',
        description: 'Quiet drama, lustrous surfaces, and considered silhouettes softened for after dark.',
        products: [
            {
                id: 'evening-light-01',
                name: 'Golden evening look',
                image: collectionTwo,
                alt: 'Model seated before red curtains wearing a golden Hysache ensemble',
                layout: 'narrow-left',
                position: 'center 38%',
            },
            {
                id: 'evening-light-02',
                name: 'Ivory evening look',
                image: collectionThree,
                alt: 'Model seated before red curtains wearing an ivory Hysache ensemble',
                layout: 'wide-right',
                position: 'center 38%',
            },
            {
                id: 'evening-light-03',
                name: 'Emerald brocade look, full-length view',
                image: look23,
                alt: 'Model wearing an emerald and magenta brocade Hysache ensemble with a matching dupatta',
                layout: 'wide-left',
                position: 'center 30%',
            },
            {
                id: 'evening-light-04',
                name: 'Emerald brocade look, detail view',
                image: look24,
                alt: 'Close view of an emerald and magenta brocade Hysache ensemble',
                layout: 'narrow-right',
                position: 'center 24%',
            },
            {
                id: 'evening-light-05',
                name: 'Fuchsia look, three-quarter view',
                image: look25,
                alt: 'Three-quarter view of a model wearing a fuchsia Hysache ensemble with gold detailing',
                layout: 'wide-left',
                position: 'center 25%',
            },
            {
                id: 'evening-light-06',
                name: 'Fuchsia look, front view',
                image: look26,
                alt: 'Front view of a fuchsia Hysache ensemble with gold neckline and border details',
                layout: 'narrow-right',
                position: 'center 28%',
            },
        ],
    },
    {
        id: 'in-bloom',
        title: 'In Bloom',
        description: 'Botanical notes and expressive colour, composed into pieces that feel quietly individual.',
        products: [
            {
                id: 'in-bloom-01',
                name: 'Purple and ivory embroidered looks',
                image: collectionFour,
                alt: 'Two models wearing purple and ivory embroidered Hysache outfits',
                layout: 'wide-left',
                position: 'center 24%',
            },
            {
                id: 'in-bloom-02',
                name: 'Navy and rust printed look',
                image: collectionFive,
                alt: 'Model wearing a blue and rust patterned Hysache ensemble',
                layout: 'narrow-right',
                position: 'center 20%',
            },
            {
                id: 'in-bloom-03',
                name: 'Blue botanical look, detail view',
                image: look19,
                alt: 'Close view of a blue botanical Hysache ensemble with a mustard-edged dupatta',
                layout: 'full',
                position: 'center 28%',
            },
            {
                id: 'in-bloom-04',
                name: 'Cream floral look, portrait view',
                image: editorialTwo,
                alt: 'Portrait of a model wearing a cream and brown floral Hysache ensemble',
                layout: 'wide-left',
                position: 'center 28%',
            },
            {
                id: 'in-bloom-05',
                name: 'Cream floral look, full-length view',
                image: look17,
                alt: 'Full-length view of a cream and brown floral Hysache ensemble with a matching dupatta',
                layout: 'narrow-right',
                position: 'center 30%',
            },
            {
                id: 'in-bloom-06',
                name: 'Cream floral look, detail view',
                image: look18,
                alt: 'Close view of the floral print and ombre border on a cream Hysache ensemble',
                layout: 'full',
                position: 'center 24%',
            },
            {
                id: 'in-bloom-07',
                name: 'Charcoal floral look, styled view',
                image: look14,
                alt: 'Close styled view of a charcoal floral Hysache ensemble with a deep red dupatta',
                layout: 'wide-left',
                position: 'center 26%',
            },
            {
                id: 'in-bloom-08',
                name: 'Charcoal floral look, full-length view',
                image: look15,
                alt: 'Full-length view of a charcoal floral Hysache ensemble with ornate borders',
                layout: 'narrow-right',
                position: 'center 28%',
            },
            {
                id: 'in-bloom-09',
                name: 'Charcoal floral look, embroidery detail',
                image: look16,
                alt: 'Close view of the neckline and sleeve embroidery on a charcoal Hysache ensemble',
                layout: 'full',
                position: 'center 22%',
            },
        ],
    },
    {
        id: 'foundations',
        title: 'Foundations',
        description: 'Enduring forms, tactile fabrics, and versatile layers for the everyday wardrobe.',
        products: [
            {
                id: 'foundations-01',
                name: 'Sage floral look, editorial view',
                image: collectionSix,
                alt: 'Model wearing a pale blue Hysache ensemble in a warm paneled room',
                layout: 'narrow-left',
                position: 'center 34%',
            },
            {
                id: 'foundations-02',
                name: 'Sage floral look, portrait view',
                image: look12,
                alt: 'Portrait of a model wearing a sage floral Hysache ensemble with a matching dupatta',
                layout: 'wide-right',
                position: 'center 28%',
            },
            {
                id: 'foundations-03',
                name: 'Cream and pink look, full-length view',
                image: look20,
                alt: 'Full-length view of a cream Hysache ensemble with pink embroidered borders',
                layout: 'wide-left',
                position: 'center 28%',
            },
            {
                id: 'foundations-04',
                name: 'Cream and pink look, hem detail',
                image: look21,
                alt: 'Close view of the embroidered hem and trousers on a cream Hysache ensemble',
                layout: 'narrow-right',
                position: 'center 68%',
            },
            {
                id: 'foundations-05',
                name: 'Cream and pink look, neckline detail',
                image: look22,
                alt: 'Close view of the pink embroidered neckline and cuffs on a cream Hysache ensemble',
                layout: 'full',
                position: 'center 24%',
            },
            {
                id: 'foundations-06',
                name: 'Blue-grey floral look, full-length view',
                image: look27,
                alt: 'Full-length view of a blue-grey floral Hysache ensemble with flowing sleeves',
                layout: 'wide-left',
                position: 'center 28%',
            },
            {
                id: 'foundations-07',
                name: 'Blue-grey floral look, detail view',
                image: look28,
                alt: 'Close view of a blue-grey floral Hysache ensemble with flowing sleeves',
                layout: 'narrow-right',
                position: 'center 24%',
            },
            {
                id: 'foundations-08',
                name: 'Ivory illustrated look',
                image: look29,
                alt: 'Model wearing an ivory Hysache ensemble with charcoal illustrated borders and a matching dupatta',
                layout: 'full',
                position: 'center 28%',
            },
        ],
    },
]
