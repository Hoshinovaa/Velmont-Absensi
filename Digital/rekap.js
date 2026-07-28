const API =
"https://script.google.com/macros/s/AKfycbwXlgPhumhe9TJGAMhzQNI6IgsMUnpwDuwvx9t7Ce_RwDrdPZzMkUZMtnjxxsRm8WNs-Q/exec?action=ranking";

async function loadRanking() {

    const container =
        document.getElementById(
            "rankingList"
        );

    try {

        const response =
            await fetch(API);

        const data =
            await response.json();

        container.innerHTML = "";

        data.forEach(item => {

            let topClass = "";

            if (item.rank === 1)
                topClass = "top1";

            else if (item.rank === 2)
                topClass = "top2";

            else if (item.rank === 3)
                topClass = "top3";

            const batchNumber =
                item.batch.replace("Batch ","");

            const batchClass =
                `batch-${batchNumber}`;

            container.innerHTML += `

            <div class="rank-row ${topClass}">

                <div class="rank">
                    #${item.rank}
                </div>

                <div class="nama">
                    ${item.nama}
                </div>

                <div class="batch-wrapper">

                    <span class="batch ${batchClass}">
                        ${item.batch}
                    </span>

                </div>

                <div class="total">
                    ${item.total}
                </div>

            </div>

            `;

        });

    }

    catch(err){

        console.error(err);

        container.innerHTML =
        `
        <div class="loading">
            Gagal memuat data ranking
        </div>
        `;
    }

}

loadRanking();