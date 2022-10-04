const express = require("express");
const mongoose = require("mongoose");
const { Schema } = mongoose;
const app = express();
const bodyParser = require('body-parser');
const PORT = 5000
const { body, validationResult } = require('express-validator');


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
mongoose.connect('mongodb+srv://AytacSafarova:Hesabim12@cluster0.dtlbfba.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true });
// mongoose.connect("mongodb+srv://user_cagatay:qqugZTCLorQGEavT@cluster0.chvjkzt.mongodb.net/codeacademydb", { useNewUrlParser: true });

const productSchema = new Schema({
    name: String,
    date: { type: Date, default: Date.now },
    price: Number,
    status: Boolean,
})

const Product = mongoose.model('Product', productSchema);


app.post('/products', (req, res) => {
    var product = new Product({
        name: req.body.name,
        price: req.body.price,
        status: true,
    });
    product.save()
    res.send(product)
})

app.get('/products', (req, res) => {
    Product.find({}, (err, docs) => {
        if (!err) {
            res.json(docs)
        }
        else {
            res.status(500).json(err);
        }
    })
})




app.listen(PORT, () => {
    console.log(`Server listening on`);
});