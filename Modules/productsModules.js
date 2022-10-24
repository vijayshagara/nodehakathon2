const mongo = require("../connect");
const { ObjectId } = require("mongodb");

module.exports.getProducts = async (req, res, next) => {
  try {
    const productsData = await mongo.selectedDB
      .collection("rentalProducts")
      .find()
      .toArray();
    res.send(productsData);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};
module.exports.updateProducts = async (req, res, next) => {
  try {
    const id = req.params.id;
    const updateData = await mongo.selectedDB
      .collection("rentalProducts")
      .findOneAndUpdate(
        { _id: ObjectId(id) },
        { $set: { ...req.body.rentalProducts } },
        { returnDocument: "after" }
      );
    res.send(updateData);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};
module.exports.createProducts = async (req, res, next) => {
  try {
    //console.log(req.body);
    const insertedResponse = await mongo.selectedDB
      .collection("rentalProducts")
      .insertOne(req.body.rentalProducts);
    res.send(insertedResponse);
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
};
module.exports.deleteProducts = async (req, res, next) => {
  try {
    const id = req.params.id;
    const deleteData = await mongo.selectedDB
      .collection("rentalProducts")
      .remove({ _id: ObjectId(id) });
    res.send(deleteData);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};
