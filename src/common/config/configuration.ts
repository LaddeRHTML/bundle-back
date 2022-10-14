export default () => ({
    port: parseInt(process.env.PORT) || 5000,
    database: {
        MONGODB_URI: process.env.MONGODB_URI
    },
    collections: {
        assemblies: process.env.COLLECTION_KEY_ASSEMBLIES,
        applications: process.env.COLLECTION_KEY_APPLICATIONS,
        accessories: process.env.COLLECTION_KEY_ACCESSORIES,
        clients: process.env.COLLECTION_KEY_CLIENTS,
        orders: process.env.COLLECTION_KEY_ORDERS,
        products: process.env.COLLECTION_KEY_PRODUCTS,
        users: process.env.COLLECTION_KEY_USERS,
        userSettings: process.env.COLLECTION_KEY_USERS_SETTINGS
    },
    jwt: {
        secret: process.env.SECRET_KEY,
        signOptions: { expiresIn: process.env.TOKEN_EXPIRATION_TIME }
    }
});
