// Update Root Theme Color
themeColor.addEventListener('input', (e) => {
    document.documentElement.style.setProperty('--primary', e.target.value);
    updatePreview();
});

function addItem() {
    const row = document.createElement("div");
    row.className = "item-input-group";
    row.style = "display: flex; flex-wrap: wrap; gap: 5px; margin-bottom: 5px;";
    row.innerHTML = `
    <input placeholder="Name" class="i-name" style="flex:3">
        <input placeholder="Desc" class="i-desc" style="flex:5">
            <input type="number" placeholder="Qty" class="i-qty" style="flex:1" value="1">
                <input type="number" placeholder="Price" class="i-prc" style="flex:2" value="0">
                    <input type="number" placeholder="Discount" class="i-dis" style="flex:1" value="0">
                        <button onclick="this.parentElement.remove();updatePreview()">X</button>
                        `;
    document.getElementById("itemsContainer").appendChild(row);
    row.querySelectorAll("input").forEach(i => i.addEventListener("input", updatePreview));
    updatePreview();
}

function addBankDetails() {
    const row = document.createElement("div");
    row.className = "bank-input-group";
    row.innerHTML = `
        <input type="text" placeholder="Beneficiary Name" id="bBenName">
        <input type="text" placeholder="Bank Name" id="bName">
        <input type="text" placeholder="Currency" id="bCurrency">
        <input type="text" placeholder="Account Number" id="bAccNumber">
        <input type="text" placeholder="Sort Code" id="bSortCode">
        <input type="text" placeholder="Swift Code(BIC)" id="bSwiftCode">
        <input type="text" placeholder="IBAN" id="bIban">
        <input type="text" placeholder="Bank Address" id="bAddress">
        <input type="text" placeholder="Country" id="bCountry">
        <button onclick="this.parentElement.remove();updatePreview()">Remove</button>
        <hr>
    `;
    document.getElementById("bankAccountDetails").appendChild(row);
    row.querySelectorAll("input").forEach(i => i.addEventListener("input", updatePreview));
    updatePreview();
}




function updatePreview() {
    // Text Mappings
    docTitlePreview.innerText = docTitle.value;
    docNumberPreview.innerText = '#' + docNumber.value;

    document.getElementById('dpRef').innerText = document.getElementById('pRef').value;
    document.getElementById('dqNum').innerText = document.getElementById('qNum').value;
    document.getElementById('dvPer').innerText = document.getElementById('vPer').value;
    document.getElementById('dpTerm').innerText = document.getElementById('pTerm').value;
    document.getElementById('duei').innerText = document.getElementById('uei').value;
    document.getElementById('dduns').innerText = document.getElementById('duns').value;
    document.getElementById('dcage').innerText = document.getElementById('cage').value;
    document.getElementById('dein').innerText = document.getElementById('ein').value;

    document.getElementById('dusHeading').innerText = document.getElementById('usHeading').value;
    document.getElementById('dusDetails').innerText = document.getElementById('usDetails').value;
    document.getElementById('dukHeading').innerText = document.getElementById('ukHeading').value;
    document.getElementById('dukDetails').innerText = document.getElementById('ukDetails').value;

    document.getElementById('dbillTo').innerText = document.getElementById('billTo').value;
    document.getElementById('dshipTo').innerText = document.getElementById('shipTo').value;
    document.getElementById('dissDate').innerText = document.getElementById('issueDate').value;
    document.getElementById('ddueDate').innerText = document.getElementById('dueDate').value;

    document.getElementById('db1Title').innerText = document.getElementById('box1Title').value;
    document.getElementById('db1Text').innerText = document.getElementById('box1Text').value;
    document.getElementById('db2Title').innerText = document.getElementById('box2Title').value;
    document.getElementById('db2Text').innerText = document.getElementById('box2Text').value;



    pEndNote.innerText = endNote.value;

    // Notes & Terms Area
    if (notes.value.trim() === "") {
        viewNotesArea.style.display = "none";
    } else {
        viewNotesArea.style.display = "block";
        pNotes.innerText = notes.value;
    }

    if (terms.value.trim() === "") {
        viewTermsArea.style.display = "none";
    } else {
        viewTermsArea.style.display = "block";
        pTerms.innerText = terms.value;
    }

    if (paymentLink.value.trim() === "") {
        viewPaymentLinkArea.style.display = "none";
    } else {
        viewPaymentLinkArea.style.display = "block";
        pLink.innerText = paymentLinkLabel.value;
        pLink.href = paymentLink.value;
    }



    // Partial Payment
    pInitialPaid.innerText = formatCurrency(initialPaid.value);
    pPaid.innerText = formatCurrency(paid.value);

    // Totals and Table
    let total = 0;
    let subtotal = 0;
    let totalDiscount = 0;
    const itemBody = document.getElementById('pItems');
    itemBody.innerHTML = "";
    document.querySelectorAll('.item-input-group').forEach(group => {
        const n = group.querySelector('.i-name').value;
        const d = group.querySelector('.i-desc').value;
        const q = Number(group.querySelector('.i-qty').value);
        const p = Number(group.querySelector('.i-prc').value);
        const dis = Number(group.querySelector('.i-dis').value);
        const rowTotal = q * p - (dis / 100 * q * p);
        subtotal += p;
        totalDiscount += dis / 100 * q * p;
        total += rowTotal;
        itemBody.innerHTML += `<tr><td>${n}</td><td>${d}</td><td>${q}</td><td>$${p.toFixed(2)}</td><td>${dis}%</td><td>$${rowTotal.toFixed(2)}</td></tr>`;
    });
    pGrand.innerText = "$" + total.toFixed(2);
    pSub.innerText = "$" + subtotal.toFixed(2);
    pDiscount.innerText = "$" + totalDiscount.toFixed(2);
    pBalance.innerText = formatCurrency(total - initialPaid.value - paid.value)


    // STAMPS CONDITIONALS
    if (showPaymentPaid.checked) {
        paidStamp.style.display = "block";
    } else {
        paidStamp.style.display = "none";
    }
    if (showPartialPaid.checked) {
        partialPaidStamp.style.display = "block";
    } else {
        partialPaidStamp.style.display = "none";
    }
    if (showPartialPaidTotals.checked) {
        partialPaymentTotals.style.display = 'block'
    } else {
        partialPaymentTotals.style.display = "none";
    }

    // Bank Details
    const bankDetailsBody = document.getElementById('pBankDetails');
    bankDetailsBody.innerHTML = "";
    document.querySelectorAll('.bank-input-group').forEach(group => {
        bankDetailsBody.innerHTML += `
            Beneficiary Name: ${group.querySelector('#bBenName').value} <br>
            Bank Name: ${group.querySelector('#bName').value} <br>
            Currency: ${group.querySelector('#bCurrency').value} <br>
            Account Number: ${group.querySelector('#bAccNumber').value} <br>
            Sort Code: ${group.querySelector('#bSortCode').value} <br>
            Swift Code(BIC): ${group.querySelector('#bSwiftCode').value} <br>
            IBAN: ${group.querySelector('#bIban').value} <br>
            Bank Address: ${group.querySelector('#bAddress').value} <br>
            Country: ${group.querySelector('#bCountry').value} <br>
            <hr>
        `;
    });
}

function downloadPDF() {
    const element = document.getElementById('previewArea');
    const opt = {
        margin: [10, 0, 20, 0], // Top, Left, Bottom, Right
        filename: docNumber.value + '.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
        pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
    };
    // const opt = {
    //     margin: [10, 0, 20, 0], // Top, Left, Bottom, Right
    //     filename: docNumber.value + '.pdf',
    //     image: { type: 'jpeg', quality: 0.98 },
    //     html2canvas: { scale: 2, useCORS: true },
    //     jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    // };

    html2pdf().from(element).set(opt).toPdf().get('pdf').then(function (pdf) {
        const totalPages = pdf.internal.getNumberOfPages();
        for (let i = 1; i <= totalPages; i++) {
            pdf.setPage(i);
            pdf.setFontSize(9);
            pdf.setTextColor(150);
            // Page number bottom left
            pdf.text('Page ' + i + ' of ' + totalPages, 15, 285);
        }
    }).save();
}

// LOAD LOGO IMAGE
function loadLogo(event) {
    const reader = new FileReader();
    const logoImg = document.getElementById('logoPreview');

    reader.onload = function () {
        // Set the src to the Base64 string of the image
        logoImg.src = reader.result;
        logoImg.style.display = 'block';
    }

    if (event.target.files[0]) {
        reader.readAsDataURL(event.target.files[0]);
    }
}

// LOAD QR IMAGE
function loadQRCode(event) {
    const reader = new FileReader();
    const qrImage = document.getElementById('qrPreview');

    reader.onload = function () {
        // Set the src to the Base64 string of the image
        qrImage.src = reader.result;
        qrImage.style.display = 'block';
    }

    if (event.target.files[0]) {
        reader.readAsDataURL(event.target.files[0]);
    }
}

function formatCurrency(amount) {

    const value = Number(amount) || 0;

    return "$" + value.toFixed(2);

}

function exportJSON() {
    const data = {
        // Basic Fields
        fields: {},
        // Dynamic Items
        items: [],
        bankDetails: [],
        // Images (Base64 strings)
        images: {
            logo: document.getElementById('logoPreview').src,
            qr: document.getElementById('qrPreview').src
        }
    };

    // 1. Capture all static inputs/textareas
    document.querySelectorAll("input:not([type='file']), textarea").forEach(input => {
        if (input.id) {
            data.fields[input.id] = input.type === 'checkbox' ? input.checked : input.value;
        }
    });

    // 2. Capture dynamic Item rows
    document.querySelectorAll('.item-input-group').forEach(group => {
        data.items.push({
            name: group.querySelector('.i-name').value,
            desc: group.querySelector('.i-desc').value,
            qty: group.querySelector('.i-qty').value,
            prc: group.querySelector('.i-prc').value,
            dis: group.querySelector('.i-dis').value
        });
    });

    // 3. Capture dynamic Bank rows
    document.querySelectorAll('.bank-input-group').forEach(group => {
        data.bankDetails.push({
            benName: group.querySelector('#bBenName').value,
            bankName: group.querySelector('#bName').value,
            currency: group.querySelector('#bCurrency').value,
            accNum: group.querySelector('#bAccNumber').value,
            sort: group.querySelector('#bSortCode').value,
            swift: group.querySelector('#bSwiftCode').value,
            iban: group.querySelector('#bIban').value,
            address: group.querySelector('#bAddress').value,
            country: group.querySelector('#bCountry').value
        });
    });

    // Trigger Download
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(data));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", (docNumber.value || "draft") + ".json");
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
}

function triggerJSONUpload() {
    document.getElementById("jsonUpload").click();
    document.getElementById('jsonUpload').addEventListener('change', importJSON)
}


function importJSON(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function (e) {
        const data = JSON.parse(e.target.result);

        // 1. Restore static fields
        for (const id in data.fields) {
            const el = document.getElementById(id);
            if (el) {
                if (el.type === 'checkbox') el.checked = data.fields[id];
                else el.value = data.fields[id];
            }
        }

        document.documentElement.style.setProperty('--primary', themeColor.value);

        // 2. Restore Items (Clear existing first)
        document.getElementById("itemsContainer").innerHTML = "";
        data.items.forEach(item => {
            addItem(); // Create row
            const lastRow = document.querySelector("#itemsContainer .item-input-group:last-child");
            lastRow.querySelector('.i-name').value = item.name;
            lastRow.querySelector('.i-desc').value = item.desc;
            lastRow.querySelector('.i-qty').value = item.qty;
            lastRow.querySelector('.i-prc').value = item.prc;
            lastRow.querySelector('.i-dis').value = item.dis;
        });

        // 3. Restore Bank Details (Clear existing first)
        document.getElementById("bankAccountDetails").innerHTML = "";
        data.bankDetails.forEach(bank => {
            addBankDetails();
            const lastRow = document.querySelector("#bankAccountDetails .bank-input-group:last-child");
            lastRow.querySelector('#bBenName').value = bank.benName;
            lastRow.querySelector('#bName').value = bank.bankName;
            lastRow.querySelector('#bCurrency').value = bank.currency;
            lastRow.querySelector('#bAccNumber').value = bank.accNum;
            lastRow.querySelector('#bSortCode').value = bank.sort;
            lastRow.querySelector('#bSwiftCode').value = bank.swift;
            lastRow.querySelector('#bIban').value = bank.iban;
            lastRow.querySelector('#bAddress').value = bank.address;
            lastRow.querySelector('#bCountry').value = bank.country;
        });

        // 4. Restore Images
        if (data.images.logo && data.images.logo.startsWith('data:image')) {
            const logoImg = document.getElementById('logoPreview');
            logoImg.src = data.images.logo;
            logoImg.style.display = 'block';
        }
        if (data.images.qr && data.images.qr.startsWith('data:image')) {
            const qrImg = document.getElementById('qrPreview');
            qrImg.src = data.images.qr;
            qrImg.style.display = 'block';
        }

        updatePreview();
        alert("Draft imported successfully!");
    };
    reader.readAsText(file);
}

// Initialize
document.querySelectorAll("input, textarea").forEach(e => e.addEventListener("input", updatePreview));
addItem();
updatePreview();
