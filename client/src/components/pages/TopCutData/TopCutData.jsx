import Table from "../../Table/Table";
import TableMajor from "../../TableMajor/Table";
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
        <TableMajor title="Majors" data={majors} />
        <Table title="Cups" data={cups} />
      </div>
    </main>
  );
}

export default TopCutData;
