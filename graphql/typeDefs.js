
const gql = require("graphql-tag");

module.exports = gql`
    type User {
        id: ID
        username: String!
        email: String!
        password: String!
        token: String
    }
    type Order {
        totalAmount: String!    
        paypalId: String!
        items: [Product!]!
        payment: ID!
        Shipping: String!
        id: ID!
    }
    type CreditCard {
        id: ID!,
        cc_name: String!
        cc_number: String!
        expiryDate: String!,
    }
    type Contact {
        id: ID!
        name: String!
    }
    type Category {
        id: ID!
        name: String!
    }
    type Product {
        id: ID!
        name: String!
        description: String!
        price: String!
        sizes: [String!]!
        images: [String!]!
        categories: [ID!]!
    }
    type Event {
        status: String!
        deliveryDate: String!
    }
    input CardInput {
        cardNumber: String!
        cardName: String!
        expiryDate: String!
        username: String!
    }
    input RegisterInput {
        username: String!
        password: String!
        confirmPassword: String!
        email: String!
    }
    input CartItem {
        id: ID!
        name: String
        description: String
        sizes: [String!]
        images: [String!]
        price: String
        size: String!
        quantity: Int!
    }
    input CreditCardInput {
        name: String!
        number: String!
        exp: String!
    }
    input cartInput{
        cartItems: [CartItem!]!
        payment: CreditCardInput
        paypalId: String
        shippingTier: String
    }
    type Query {
        fetchCreditCards(username: String!): [CreditCard!]!
        fetchContact(username: String!): Contact!
        fetchCategories: [Category!]!
        fetchProducts: [Product!]!
        fetchProduct(id: String!): Product!
    }
    type Mutation {
        register(email: String!, password: String!): User!
        login(email: String!, password: String!): User!
        registerCreditCard(cardInput: CardInput!): CreditCard!
        deleteCreditCard(cardInput: CardInput!): [CreditCard!]!
        createContact(username: String!): Contact!
        deleteContact(username: String!): String!
        createCategory(category: String!): Category!
        deleteCategory(category: String!): String!
        createProduct(name: String, description: String!, price: String!, sizes: [String!]!, images: [String!]!): Product!
        deleteProduct(name: String, description: String!, price: String!): String!
        createEvent: Event!
        addCategory(productId: String!, categoryId: String!): Product!
        filterByCategory(categoryId: ID!): [Product!]!
        createOrder(cartInput: cartInput): Order!
    }
`