import bcrypt from 'bcryptjs'

const data ={
    users:[
        {
            name: 'Basir',
            email: 'admin@example.com',
            password : bcrypt.hashSync('1234', 8),
            isAdmin: true
        },
        {
            name: 'John',
            email: 'john@example.com',
            password : bcrypt.hashSync('1234', 8),
            isAdmin: false
        }
    ],
    products : [
        {
            name : 'Nike Slim Shirt',
            category: 'Shirts',
            image: '/images/p1.jpg',
            price: 120,
            countInStock: 99,
            brand: 'Nike',
            rating: 4.5,
            numReviews: 10,
            description: 'high quality product',
        },
        {
            name : 'Adidas Slim Shirt',
            category: 'Shirts',
            image: '/images/p1.jpg',
            price: 220,
            countInStock: 20,
            brand: 'Adidas',
            rating: 3,
            numReviews: 15,
            description: 'high quality product',
        },
        {
            name : 'Park Slim Shirt',
            category: 'Tee',
            image: '/images/p1.jpg',
            price: 120,
            countInStock: 0,
            brand: 'Park',
            rating: 1,
            numReviews: 99,
            description: 'high quality product',
        },
        {
            name : 'T-Shirt',
            category: 'T-Shirts',
            image: '/images/p1.jpg',
            price: 50,
            countInStock: 15,
            brand: 'new',
            rating: 3.5,
            numReviews: 44,
            description: 'high quality product',
        },
        {
            name : 'Nike Shoes',
            category: 'Shoes',
            image: '/images/p1.jpg',
            price: 980,
            countInStock: 5,
            brand: 'Nike',
            rating: 4.0,
            numReviews: 66,
            description: 'high quality product',
        },
        {
            name : 'Adidas Bag',
            category: 'Bag',
            image: '/images/p1.jpg',
            price: 1500,
            countInStock: 12,
            brand: 'Adidas',
            rating: 3.5,
            numReviews: 3,
            description: 'high quality product',
        },

    ]
}

export default data