import express from "express";

const app = express();

app.get("/", (req, res) => {
    console.log("Hello World!");
})

app.listen(process.env.PORT || 3001, () => {
    console.log(`App listening at port ${process.env.PORT || 3001}`);
});