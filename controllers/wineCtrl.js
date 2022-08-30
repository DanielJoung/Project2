const express = require('express');
const router = express.Router()
const Wine = require('../models/wines.js')

const authRequired = (req,res,next) => {
    if(req.session.currentUser) {
        next()
    }else {
        res.redirect(`/find-wine/${req.params.id}?error=true`)
    }
}

const authRequiredCreate = (req,res,next) => {
    if(req.session.currentUser) {
        next()
    }else {
        res.redirect(`/find-wine`)
    }
}

// index
router.get("/", async (req,res) => {
    const wines = await Wine.find({})
    res.render("index.ejs", {
        wines,
        user:req.session.currentUser,
        error: req.query.error
    })
})

// seed
router.get("/seed", (req,res) => {
    Wine.create(
        [
            {
                wineName: "Chateau Landreau",
                color:"red",
                years: 2016,
                img: "https://www.wine.com/product/images/w_160,h_160,dpr_2.0,c_fit,q_auto:good,fl_progressive/gbu9yymo2paxfszte9yk.jpg",
                price: 16.99,
                desc: `With a typical "Côtes de Bourg" bouquet, Château Landreau combines fruitiness, finesse, roundness and tannic structure. The typicality of Merlot gives it hints of slightly chocolatey black cherries. Over the years, it will become one of the great wines of Côtes de Bourg, a flagship of Bordeaux wines.

                Charismatic wine, it goes perfectly with game, red meats and goes well with cheeses of character. It also accompanies any type of spicy cuisine.
                
                Blend: 85% Merlot, 15% Cabernet Sauvignon`
            },
            {
                wineName: "Meiomi Pinot Noir",
                color: "red",
                years: 2020,
                img: "https://www.wine.com/product/images/w_160,h_160,dpr_2.0,c_fit,q_auto:good,fl_progressive/aezi4trmijzncwz5blqe.jpg",
                price: 21.99,
                desc: `A rich garnet color, the wine reveals lifted fruit aromas of bright strawberry and jammy fruit, mocha, vanilla, and toasty oak. Expressive boysenberry, blackberry, dark cherry, juicy strawberry, and toasty mocha flavors lend complexity to the soft, plush palate. The well-integrated oak provides structure and depth seldom seen in Pinot Noir.
                `
            },{
                wineName: "Details Sonoma County Cabernet Sauvignon",
                color: "red",
                years: 2020,
                img: "https://www.wine.com/product/images/w_250,h_250,dpr_2.0,c_fit,q_auto:good,fl_progressive/gedjuq7t5vy0loswazhr.jpg",
                price: 49.99,
                desc: `The 2019 DETAILS Cabernet Sauvignon delivers elegance, depth, and power in one stunning wine. Enticing aromas of violets and ripe raspberries are followed by notes of sage, allspice, and a touch of balsamic reduction.

                Blend: 78% Cabernet Sauvignon, 8% Malbec, 5% Merlot, 5% Petite Sirah, 4% Petit Verdot`
            },
            {
                wineName: "Chateau Margaux",
                color: "red",
                years: 2000,
                img: "https://www.wine.com/product/images/w_250,h_250,dpr_2.0,c_fit,q_auto:good,fl_progressive/ffhbww9uctopqokazdwx.jpg",
                price: 1369.99,
                desc: `We were unaware at that time that we were harvesting one of the greatest vintages of the late 20th century. The grapes had rarely, perhaps never, been as concentrated, particularly the Cabernets. In certain cases we surpassed the already historic levels of the 1986 and 1995 vintages, with an elegance and softness on the palate, reminiscent also of the 1990 and 1996 vintages. It seemed in fact that 2000 was setting a new benchmark in quality, never before attained, at least in terms of style. Throughout the barrel ageing time, these first impressions were gradually confirmed. The wine has now acquired a slightly tighter texture and at the same time keeps such a soft and especially long finish that it seems to go on forever… The bottling took place in November 2002, after over 2 years of barrel ageing. Such a long ageing is unusual but not as rare as one might think: most of the greatest vintages are aged for that length of time.`
            },
            {
                wineName: "Louis Latour Batard-Montrachet Clos Poirier Grand Cru",
                color: "white",
                years: 2006,
                img: "https://www.wine.com/product/images/w_250,h_250,dpr_2.0,c_fit,q_auto:good,fl_progressive/v3qh89gm2eobwd8lskff.jpg",
                price: 859.99,
                desc: `Of a gold nuances color, this Bâtard-Montrachet "Clos Poirier" 2019 unveils an intense nose with yellow peach, almond paste and honey aromas. The mouth is ample and round with fresh almond, vanilla and brioche notes. This wine offers a beautiful tension as well as a slightly salty finish. Nice aromatic persistence.`
            },
            {
                wineName: "Far Niente Chardonnay",
                color: "white",
                years: 2019,
                img: "https://www.wine.com/product/images/w_250,h_250,dpr_2.0,c_fit,q_auto:good,fl_progressive/ocyimcnfif9hhvceslcv.jpg",
                price: 64.99,
                desc: `The 2019 vintage is the 40th Anniversary release of Far Niente Chardonnay.

                Classically beautiful, the 2019 vintage opens with aromas of honeysuckle, white peach blossom and citrus zest, along with soft accents of vanilla. Silky stone fruit, lemon curd and honeydew flavors flow across the round, full palate, with lightly toasted oak, cool minerality and a lingering citrus note adding texture and depth. From its alluring perfume and pure fruit flavors to the graceful finish, this elegant Napa Valley Chardonnay captivates the senses.`
            },
            {
                wineName: "Albert Bichot Corton-Charlemagne Grand Cru Domaine du Pavillon",
                color: "white",
                years: 2019,
                img: "https://www.wine.com/product/images/w_250,h_250,dpr_2.0,c_fit,q_auto:good,fl_progressive/dsmpdiph9elnmz2nzzmb.jpg",
                price: 269.99,
                desc: `96 points; International Chardonnay Trophy; French White Trophy; White Burgundy Trophy - International Wine Challenge 2021 "Pale white gold colour. Magnificent nose of coconut cream, melon, honey, lime and white blossom. Palate has almost eyewatering concentration. Long, firm, mineral finish. A superb and serious Grand Cru!"`
            }
        ],
        (err,wine) => {
            res.redirect("/find-wine")
        }
    )
})

// new
router.get("/new", authRequiredCreate,(req,res) => {
    res.render("new.ejs")
})

// show price 
router.get("/findPrice25", async(req,res) => {
    const wine = await Wine.find({price:{$lte:25}})
    res.render("show-price.ejs", {
        wine:wine,
        user:req.session.currentUser
    })
})
router.get("/findPrice50", async(req,res) => {
    const wine = await Wine.find({price:{$lte:50}})
    res.render("show-price.ejs", {
        wine:wine,
        user:req.session.currentUser
    })
})
router.get("/findPrice100", async(req,res) => {
    const wine = await Wine.find({price:{$lte:100}})
    res.render("show-price.ejs", {
        wine:wine,
        user:req.session.currentUser
    })
})
router.get("/findPriceMore100", async(req,res) => {
    const wine = await Wine.find({price:{$gte:100}})
    res.render("show-price.ejs", {
        wine:wine,
        user:req.session.currentUser
    })
})

// show color
router.get("/findColorRed", async(req,res) => {
    const wine = await Wine.find({color:"red"})
    res.render("show-color.ejs", {
        wine:wine,
        user:req.session.currentUser
    })
})

router.get("/findColorWhite", async(req,res) => {
    const wine = await Wine.find({color:"white"})
    res.render("show-color.ejs", {
        wine:wine,
        user:req.session.currentUser
    })
})


// show
router.get("/:id", async(req,res) => {
    const wine = await Wine.findById(req.params.id)
    res.render("show.ejs", {
        wine,
        user:req.session.currentUser,
        error: req.query.error
    })
})


// create 
router.post("/", (req,res) => {
    Wine.create(req.body, (err,createWine) => {
        if(err) res.send(err)
        res.redirect("/find-wine")
    })
})

// delete
router.delete("/:id", authRequired,(req,res) => {
    Wine.findByIdAndDelete(req.params.id, (err,wine) => {
        if(err) res.send(err)
        res.redirect("/find-wine")
    })
})

// edit 
router.get("/:id/edit", authRequired, (req,res) => {
    Wine.findById(req.params.id, (err, wine) => {
        if(err) res.send(err)
        res.render("edit.ejs", {
            wine: wine,
            user:req.session.currentUser
        })
    })
})


// update
router.put("/:id", (req,res) => {
    Wine.findByIdAndUpdate(req.params.id, req.body, (err,wine) => {
        if(err) res.send(err)
        res.redirect("/find-wine")
    })
})

module.exports = router