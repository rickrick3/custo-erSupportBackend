const FAQ = require("../libs/model/FAQmodel")
const Notifications = require("../services/notificationService")
const Admin = require("../libs/model/adminModel")

exports.createFAQ = async (req, res) => {
    try {
        const faq = await FAQ.create(req.body)

        const admin = await Admin.find({role : 'Admin'})
        if(admin){
            Notifications.sendNotification(admin.email, `A new FAQ '${faq.question}' has been created.`)
        }
            res.status(201).json({message: 'FAQ created successfully', faq: faq})

    }catch(error){
        res.status(500).json({error: error.message})
    }
}

exports.getFAQs = async (req, res) => {
    try {
        const faqs = await FAQ.find()
        res.status(200).json(faqs)
    }catch(error){
        res.status(500).json({error: error.message})
    }
}

exports.updateFAQ = async (req, res) => {
    try {
        const faq = await FAQ.findByIdAndUpdate(req.params.id, req.body, {
            new : true,
        })
        if(!faq) return res.status(404).json({message: 'FAQ not found!'})
        res.status(200).json(faq)
    }catch(error){
        res.status(500).json({error: error.message})
    }
}

exports.deleteFAQ = async (req, res) => {
    try {
        const faq = await FAQ.findByIdAndDelete(req.params.id)
        if(!faq) return res.status(404).json({message: 'FAQ not found!'})
        res.status(200).json(faq)
    }catch(error){
        res.status(500).json({error: error.message})
}
}