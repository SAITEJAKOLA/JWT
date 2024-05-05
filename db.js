const users = [
    {
    username: "stk",
    email: "stkrandom@acc.in",
    password: "HelloWorld@123"
},{
    username: "saiteja",
    email: "saitejakola@acc.in",
    password: "HelloWorld@123"
}]
const publicPosts= [
    {
        postName: 'Public Post 1',
        text : 'Welcome to JWT learning'
    },
    {
        postName: 'Public Post 2',
        text : 'Welcome to JWT learning'
    },
    {
        postName: 'Public Post 3',
        text : 'Welcome to JWT learning'
    },    {
        postName: 'Public Post 4',
        text : 'Welcome to JWT learning'
    }
]
const privatePosts= [
    {
        "postName": "Private Access Point 1",
        "text": "Exploring the realms of JWT authentication."
    },
    {
        "postName": "Restricted Entry 2",
        "text": "Unlocking the secrets behind JWT authentication."
    },
    {
        "postName": "Confidential Session 3",
        "text": "Delving deep into the intricacies of JWT authentication."
    },
    {
        "postName": "Secure Gateway 4",
        "text": "Guarding your data with JWT authentication."
    }
]


module.exports = {
    users,
    publicPosts,
    privatePosts
};