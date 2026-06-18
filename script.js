document
.querySelectorAll(".company-card")
.forEach(card=>{

    card.addEventListener(
        "click",
        ()=>{

            card.animate(
            [
                {
                    transform:"scale(1)"
                },
                {
                    transform:"scale(.97)"
                },
                {
                    transform:"scale(1)"
                }
            ],
            {
                duration:250
            });

        }
    );

});