// 切換顯示報表節點
function toggleNode(id) {
  const node = document.getElementById(id);
  node.style.display = node.style.display === "block" ? "none" : "block";
}

// 顯示日報表或月報表的選擇框
function showDateSelector(reportType) {
  // 隱藏所有報表
  document.getElementById("dailyReport").style.display = "none";
  document.getElementById("monthlyReport").style.display = "none";
  document.getElementById("dailyFieldSelectors").style.display = "none";
  document.getElementById("monthlyFieldSelectors").style.display = "none";

  // 顯示對應選擇框
  if (reportType === "daily") {
    document.getElementById("dailyReport").style.display = "block"; // 顯示日報表
    document.getElementById("dailyFieldSelectors").style.display = "block"; // 顯示欄位選擇框
    document.getElementById("dailyReportTable").style.display = "none";
    // 當顯示日報表時, 也加載表格數據
  } else if (reportType === "monthly") {
    document.getElementById("monthlyReport").style.display = "block"; // 顯示月報表
    document.getElementById("monthlyFieldSelectors").style.display = "block"; // 顯示欄位選擇框
    document.getElementById("monthlyReportTable").style.display = "none";
  }
}

// 生成並顯示日報表數據
function loadDailyReportData() {
  const selectedDate = document.getElementById("dailyDate").value;
  if (!selectedDate) {
    alert("請選擇日期");
    return;
  }

  // 顯示日報表欄位選擇框
  const dailyFieldSelectors = document.getElementById("dailyFieldSelectors");
  dailyFieldSelectors.style.display = "block";

  // 模擬日報表數據
  const tableData = generateDailyReportData(selectedDate);

  // 動態更新表頭
  updateDailyReportHeader();

  // 填充表格
  populateDailyReportTable(tableData);

  // 顯示表格
  document.getElementById("dailyReportTable").style.display = "block";
}

// 根據選擇的欄位生成日報表數據
function generateDailyReportData(selectedDate) {
  // 模擬日報數據
  const rawData = [
    {
      hour: 0,
      showDailyRA: 2292,
      showDailySA: 61,
      showDailyTA: 62,
      showDailyNA: 10,
      showDailyKWH: 20,
    },
    {
      hour: 1,
      showDailyRA: 2492,
      showDailySA: 61,
      showDailyTA: 62,
      showDailyNA: 10,
      showDailyKWH: 30,
    },
    {
      hour: 2,
      showDailyRA: 2392,
      showDailySA: 61,
      showDailyTA: 62,
      showDailyNA: 10,
      showDailyKWH: 30,
    },
    {
      hour: 3,
      showDailyRA: 2592,
      showDailySA: 61,
      showDailyTA: 62,
      showDailyNA: 10,
      showDailyKWH: 30,
    },
  ];

  // 根據勾選框來篩選顯示的數據
  const hour = document.getElementById("hour").checked;
  const showDailyRA = document.getElementById("showDailyRA").checked;
  const showDailySA = document.getElementById("showDailySA").checked;
  const showDailyTA = document.getElementById("showDailyTA").checked;
  const showDailyNA = document.getElementById("showDailyNA").checked;
  const showDailyKWH = document.getElementById("showDailyKWH").checked;

  return rawData.map((row) => {
    const filteredRow = {};
    if (hour) filteredRow.hour = row.hour;
    if (showDailyRA) filteredRow.showDailyRA = row.showDailyRA;
    if (showDailySA) filteredRow.showDailySA = row.showDailySA;
    if (showDailyTA) filteredRow.showDailyTA = row.showDailyTA;
    if (showDailyNA) filteredRow.showDailyNA = row.showDailyNA;
    if (showDailyKWH) filteredRow.showDailyKWH = row.showDailyKWH;
    return filteredRow;
  });
}

// 動態更新日報表的表頭
function updateDailyReportHeader() {
  const tableHeader = document
    .getElementById("dailyTableData")
    .getElementsByTagName("thead")[0]
    .getElementsByTagName("tr")[0];
  tableHeader.innerHTML = ""; // 清空現有標題
  const hour = document.getElementById("hour").checked;
  const showDailyRA = document.getElementById("showDailyRA").checked;
  const showDailySA = document.getElementById("showDailySA").checked;
  const showDailyTA = document.getElementById("showDailyTA").checked;
  const showDailyNA = document.getElementById("showDailyNA").checked;
  const showDailyKWH = document.getElementById("showDailyKWH").checked;

  if (hour) {
    const thHour = document.createElement("th");
    thHour.textContent = "小時";
    tableHeader.appendChild(thHour);
  }

  if (showDailyRA) {
    const thRA = document.createElement("th");
    thRA.textContent = "R(A)";
    tableHeader.appendChild(thRA);
  }

  if (showDailySA) {
    const thSA = document.createElement("th");
    thSA.textContent = "S(A)";
    tableHeader.appendChild(thSA);
  }

  if (showDailyTA) {
    const thTA = document.createElement("th");
    thTA.textContent = "T(A)";
    tableHeader.appendChild(thTA);
  }

  if (showDailyNA) {
    const thNA = document.createElement("th");
    thNA.textContent = "N(A)";
    tableHeader.appendChild(thNA);
  }

  if (showDailyKWH) {
    const thKWH = document.createElement("th");
    thKWH.textContent = "KWH";
    tableHeader.appendChild(thKWH);
  }
}

// 填充日報表
function populateDailyReportTable(tableData) {
  const tableBody = document
    .getElementById("dailyTableData")
    .getElementsByTagName("tbody")[0];
  tableBody.innerHTML = "";

  tableData.forEach((row) => {
    const tr = document.createElement("tr");
    if (row.hour !== undefined) {
      const tdhour = document.createElement("td");
      tdhour.textContent = row.hour;
      tr.appendChild(tdhour);
    }
    if (row.showDailyRA !== undefined) {
      const tdRA = document.createElement("td");
      tdRA.textContent = row.showDailyRA;
      tr.appendChild(tdRA);
    }

    if (row.showDailySA !== undefined) {
      const tdSA = document.createElement("td");
      tdSA.textContent = row.showDailySA;
      tr.appendChild(tdSA);
    }

    if (row.showDailyTA !== undefined) {
      const tdTA = document.createElement("td");
      tdTA.textContent = row.showDailyTA;
      tr.appendChild(tdTA);
    }

    if (row.showDailyNA !== undefined) {
      const tdNA = document.createElement("td");
      tdNA.textContent = row.showDailyNA;
      tr.appendChild(tdNA);
    }

    if (row.showDailyKWH !== undefined) {
      const tdKWH = document.createElement("td");
      tdKWH.textContent = row.showDailyKWH;
      tr.appendChild(tdKWH);
    }

    tableBody.appendChild(tr);
  });
}
// 生成並顯示月報表數據
function loadMonthlyReportData() {
  const selectedMonth = document.getElementById("monthlyDate").value;
  if (!selectedMonth) {
    alert("請選擇月份");
    return;
  }

  // 顯示月報表欄位選擇框
  const monthlyFieldSelectors = document.getElementById(
    "monthlyFieldSelectors"
  );
  monthlyFieldSelectors.style.display = "block";

  // 模擬月報表數據
  const tableData = generateMonthlyReportData(selectedMonth);

  // 動態更新表頭
  updateMonthlyReportHeader();

  populateMonthlyReportTable(tableData);
  document.getElementById("monthlyReportTable").style.display = "block";
}

// 根據選擇的欄位生成月報表數據
function generateMonthlyReportData(selectedMonth) {
  // 模擬月報數據
  const rawData = [
    { date: 1, totalKWH: 120, avgKWH: 4, maxKWH: 10 },
    { date: 2, totalKWH: 150, avgKWH: 5, maxKWH: 12 },
    { date: 3, totalKWH: 180, avgKWH: 6, maxKWH: 15 },
    { date: 4, totalKWH: 130, avgKWH: 4.5, maxKWH: 11 },
  ];

  const dated = document.getElementById("dated").checked;
  const showMonthlyTotalKWH = document.getElementById(
    "showMonthlyTotalKWH"
  ).checked;
  const showMonthlyAvgKWH =
    document.getElementById("showMonthlyAvgKWH").checked;
  const showMonthlyMaxKWH =
    document.getElementById("showMonthlyMaxKWH").checked;

  return rawData.map((row) => {
    const filteredRow = {};
    if (dated) filteredRow.date = row.date; // 這裡應該是 "date" 而不是 "dated"
    if (showMonthlyTotalKWH) filteredRow.totalKWH = row.totalKWH;
    if (showMonthlyAvgKWH) filteredRow.avgKWH = row.avgKWH;
    if (showMonthlyMaxKWH) filteredRow.maxKWH = row.maxKWH;
    return filteredRow;
  });
}

// 動態更新月報表的表頭
function updateMonthlyReportHeader() {
  const tableHeader = document
    .getElementById("monthlyTableData")
    .getElementsByTagName("thead")[0]
    .getElementsByTagName("tr")[0];
  tableHeader.innerHTML = ""; // 清空現有標題

  const dated = document.getElementById("dated").checked;
  const showMonthlyTotalKWH = document.getElementById(
    "showMonthlyTotalKWH"
  ).checked;
  const showMonthlyAvgKWH =
    document.getElementById("showMonthlyAvgKWH").checked;
  const showMonthlyMaxKWH =
    document.getElementById("showMonthlyMaxKWH").checked;

  if (dated) {
    const thDate = document.createElement("th");
    thDate.textContent = "日期"; // 確保標題一致
    tableHeader.appendChild(thDate);
  }
  if (showMonthlyTotalKWH) {
    const thTotalKWH = document.createElement("th");
    thTotalKWH.textContent = "總和KWH";
    tableHeader.appendChild(thTotalKWH);
  }

  if (showMonthlyAvgKWH) {
    const thAvgKWH = document.createElement("th");
    thAvgKWH.textContent = "平均KWH";
    tableHeader.appendChild(thAvgKWH);
  }

  if (showMonthlyMaxKWH) {
    const thMaxKWH = document.createElement("th");
    thMaxKWH.textContent = "最大KWH";
    tableHeader.appendChild(thMaxKWH);
  }
}

// 填充月報表
function populateMonthlyReportTable(tableData) {
  const tableBody = document
    .getElementById("monthlyTableData")
    .getElementsByTagName("tbody")[0];
  tableBody.innerHTML = "";

  tableData.forEach((row) => {
    const tr = document.createElement("tr");
    if (row.date !== undefined) {
      const tdDate = document.createElement("td");
      tdDate.textContent = row.date;
      tr.appendChild(tdDate);
    }

    if (row.totalKWH !== undefined) {
      const tdTotalKWH = document.createElement("td");
      tdTotalKWH.textContent = row.totalKWH;
      tr.appendChild(tdTotalKWH);
    }

    if (row.avgKWH !== undefined) {
      const tdAvgKWH = document.createElement("td");
      tdAvgKWH.textContent = row.avgKWH;
      tr.appendChild(tdAvgKWH);
    }

    if (row.maxKWH !== undefined) {
      const tdMaxKWH = document.createElement("td");
      tdMaxKWH.textContent = row.maxKWH;
      tr.appendChild(tdMaxKWH);
    }

    tableBody.appendChild(tr);
  });
}
