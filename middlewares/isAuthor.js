const Post = require("../models/Post");

const isAuthor = async(req, res, next) => {
    try {
        const post = await Post.findById(req.params._id);
        <<<<<<<HEAD
        if (post.userId.toString() !== req.user._id.toString()) {
            return res
                .status(403)
                .send({message: `Post with id ${req.params._id} is not yours`});
        }
        next();
    } catch (error) {
        console.error(error);
        return res
            .status(500)
            .send({error, message: "There was a problem verifying the authorship of the post"});
    }
};

module.exports = {
    isAuthor
};
=======const comment = await Comment
if (post.userId.toString() !== req.user._id.toString()) {
    return res
        .status(403)
        .send({message: `Post with id ${req.params._id} is not yours`});
}
next();
} catch (error) {
console.error(error);
return res
    .status(500)
    .send({error, message: "There was a problem verifying the authorship of the post"});
}
};

module.exports = {
isAuthor
};
>>>>>>>develop
