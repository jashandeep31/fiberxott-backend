const express = require("express");
const AdminBroExpress = require("@admin-bro/express");
const AdminBroMongoose = require("@admin-bro/mongoose");
const AdminBro = require("admin-bro");
const app = express();
const mongoose = require("mongoose");
const port = 8000;
const Ott = require("./models/OttModels");
const cors = require("cors");

// const port = 8000; this is not getting used
app.use(cors());
app.use(express.json());

var corsOptions = {
    origin: "*",
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.get("/", (req, res) => {
    Ott.find().then((data) => {
        res.send(data);
    });
});

// get one item by slug
app.get("/:slug", (req, res) => {
    const slug = req.params.slug;
    Ott.findOne({ slug: slug }).then((data) => {
        res.send(data);
    });
});

app.get("/addnewsfasdf", async (req, res) => {
    const OTT = await Ott.create({
        name: "Netflix",
        description:
            "At Netflix, we want to entertain the world. Whatever your taste, and no matter where you live, we give you access to best-in-class TV series, documentaries, feature films and mobile games. Our members control what they want to watch, when they want it, in one simple subscription. We’re streaming in more than 30 languages and 190 countries, because great stories can come from anywhere and be loved everywhere. We are the world’s biggest fans of entertainment, and we’re always looking to help you find your next favorite story.",
        category: "ott",
        img: "https://www.freepnglogos.com/uploads/netflix-logo-app-png-16.png",

        banner: "https://variety.com/wp-content/uploads/2020/05/netflix-logo.png",
        stock: true,
        items: [
            {
                name: "1 Month 4k",
                price: 100,
                description: "1 Month 4k",
                period: "months",
                count: 1,
            },
        ],
    });
    res.send("Hello World!");
});

const doEverything = async () => {
    mongoose
        .connect(
            "mongodb+srv://jashan:jashan@cluster0.s70xibz.mongodb.net/?retryWrites=true&w=majority",
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            }
        )
        .then(() => {
            console.log("Connected to database");
        })
        .catch((err) => {
            console.log("Error connecting to database", err);
        });

    AdminBro.registerAdapter(AdminBroMongoose);
    const adminBro = new AdminBro({
        databases: [mongoose],
        rootPath: "/admin",
    });
    const router = AdminBroExpress.buildRouter(adminBro);

    app.use(adminBro.options.rootPath, router);
    app.listen(8000, () =>
        console.log("AdminBro is under localhost:8000/admin")
    );
};
doEverything();
