import editorialTwo from '../assets/images/collections/7-comp.jpg'
import editorialThree from '../assets/images/collections/8-comp.jpg'
import collectionOne from '../assets/images/collections/1-comp.jpg'
import collectionTwo from '../assets/images/collections/2-comp.jpg'
import collectionThree from '../assets/images/collections/3-comp.jpg'
import collectionFour from '../assets/images/collections/4-comp.jpg'
import collectionFive from '../assets/images/collections/5.jpeg'
import collectionSix from '../assets/images/collections/6-comp.jpg'
import collectionSeven from '../assets/images/collections/rotated-1-comp.jpg'

export const CATALOG_COLLECTIONS = [
    {
        id: 'the-day-edit',
        title: 'The Day Edit',
        description: 'Easy silhouettes made for unhurried days, grounded in soft colour and thoughtful detail.',
        products: [
            {
                id: 'day-edit-01',
                name: 'Day Edit look one',
                image: "/hero.jpg",
                alt: 'Model wearing a flowing golden Hysache ensemble against a deep red backdrop',
                layout: 'wide-left',
                position: 'center',
            },
            {
                id: 'day-edit-02',
                name: 'Day Edit look two',
                image: collectionOne,
                alt: 'Two models wearing red and ivory floral Hysache ensembles in a warm interior',
                layout: 'narrow-right',
                position: 'center 32%',
            },
            {
                id: 'day-edit-03',
                name: 'Day Edit look three',
                image: collectionSeven,
                alt: 'Two models in red and ivory floral outfits beneath a chandelier',
                layout: 'full',
                position: 'center 38%',
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
                name: 'Evening Light look one',
                image: collectionTwo,
                alt: 'Model seated before red curtains wearing a golden Hysache ensemble',
                layout: 'narrow-left',
                position: 'center 38%',
            },
            {
                id: 'evening-light-02',
                name: 'Evening Light look two',
                image: collectionThree,
                alt: 'Model seated before red curtains wearing an ivory Hysache ensemble',
                layout: 'wide-right',
                position: 'center 38%',
            },
            {
                id: 'evening-light-03',
                name: 'Evening Light look three',
                image: editorialTwo,
                alt: 'Portrait of a model wearing a soft floral Hysache kurti',
                layout: 'full',
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
                name: 'In Bloom look one',
                image: collectionFour,
                alt: 'Two models wearing purple and ivory embroidered Hysache outfits',
                layout: 'wide-left',
                position: 'center 24%',
            },
            {
                id: 'in-bloom-02',
                name: 'In Bloom look two',
                image: collectionFive,
                alt: 'Model wearing a blue and rust patterned Hysache ensemble',
                layout: 'narrow-right',
                position: 'center 20%',
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
                name: 'Foundations look one',
                image: collectionSix,
                alt: 'Model wearing a pale blue Hysache ensemble in a warm paneled room',
                layout: 'narrow-left',
                position: 'center 34%',
            },
            {
                id: 'foundations-02',
                name: 'Foundations look two',
                image: editorialThree,
                alt: 'Model wearing a blue and rust patterned Hysache outfit against a pale backdrop',
                layout: 'wide-right',
                position: 'center 18%',
            },
        ],
    },
]
