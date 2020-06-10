import chalk from "chalk";

export const createOne = (model) => async (req, res) => {
    let response;
    try {
        response = await model.create({
            ...req.body,
        });
    } catch (error) {
        console.log(chalk.redBright.bold(error));
        if (error) return res.status(400).json(error);
    }
    res.status(201).send({ data: response });
};

export const getMany = (model) => async (req, res) => {
    try {
        let page = req.query.page;
        if (+req.query.page === 1) page = 0;
        if (!req.query.page) page = 0;
        const docs = await model
            .find()
            .skip(+page * 8)
            .limit(10)
            .lean()
            .exec();
        console.log(docs);
        console.log(req.query);
        res.status(200).send({ data: docs, page: page });
    } catch (error) {
        console.log(error);
        res.status(400).end;
    }
};

export const getOne = (model) => async (req, res) => {
    const docs = await model.findOne({ _id: req.params.id }).exec();

    if (docs) {
        res.status(200).send({ data: docs });
    } else {
        res.status(404).end();
    }
};
export const removeOne = (model) => async (req, res) => {
    let response = await model.findOneAndRemove({ _id: req.params.id });
    if (response) {
        res.status(200).json({
            data: "deleted",
        });
    } else {
        res.status(400).end();
    }
};
export const updateOne = (model) => async (req, res) => {
    console.log(req.body);
    let doc = await model.findOneAndUpdate(
        { _id: req.params.id },
        { ...req.body },
        { new: true }
    );
    if (doc) {
        res.status(200).json({ data: doc });
    } else {
        res.status(404).end();
    }
};

export const crudControllers = (model) => ({
    removeOne: removeOne(model),
    updateOne: updateOne(model),
    getMany: getMany(model),
    getOne: getOne(model),
    createOne: createOne(model),
});
