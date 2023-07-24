import Table from "../../Table/Table";
import cups from "../../../data/CupData";
import majors from "../../../data/MajorData";
import "./TopCutData.css";
function TopCutData() {
  cups.sort((a, b) => {
    return a.masters - b.masters;
  });
  majors.sort((a, b) => {
    return a.masters - b.masters;
  });
  console.log(majors, cups);
  return (
    <main id="top-cut-data">
      <h2 className="page-title">Top Cut Data</h2>
      <div className="tables-holder">
        <Table title="Cups" data={cups} />
        <Table title="Majors" data={majors} />
      </div>
    </main>
  );
}

export default TopCutData;
