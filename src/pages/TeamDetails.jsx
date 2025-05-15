import { Link, useParams } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { fetchMember } from "../slices/memberSlice";
import { updateTeam } from "../slices/teamSlice";

const TeamDetails = () => {
  const dispatch = useDispatch();
  const { teamId } = useParams();
  const { teams } = useSelector((state) => state.teams);
  const getTeam = teams.find((tea) => tea._id == teamId);

  const [name, setName] = useState("");

  const { members, status } = useSelector((state) => state.members);

  useEffect(() => {
    dispatch(fetchMember());
  }, [dispatch]);

  const handleAddMember = async (e) => {
    e.preventDefault();

    // Find the member by name
    const matchedMember = members.find(
      (member) => member.name.toLowerCase() === name.toLowerCase()
    );

    if (!matchedMember) {
      alert("Member not found.");
      return;
    }

    const updatedMembers = [
      ...getTeam.members.map((m) => m._id || m),
      matchedMember._id,
    ];

    try {
      await dispatch(
        updateTeam({
          teamId: getTeam._id,
          updatedTeam: { members: updatedMembers },
        })
      ).unwrap();

      setName("");

      const modal = bootstrap.Modal.getInstance(
        document.getElementById("exampleModal")
      );
      modal.hide();
    } catch (error) {
      console.error("Failed to update team:", error);
    }
  };

  return (
    <div className="container-fluid">
    {/* Sidebar */}
    <div className="row">
      <div
        className="offcanvas offcanvas-start overflow-auto"
        tabIndex="-1"
        id="mobileSidebar"
        aria-labelledby="mobileSidebarLabel"
        style={{ width: "250px" }}
      >
        <div className="offcanvas-header">
          <button
            type="button"
            className="btn-close text-reset"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body p-0">
          <Sidebar />
        </div>
      </div>

      <div
          className="col-12 col-md-3 col-lg-2 d-none d-md-block p-0"
          style={{
            position: "sticky",
            top: 0,
            height: "100vh",
            overflowY: "auto",
          }}
        >
          <Sidebar />
        </div>

      {/* Main Content */}
        <div className="col-12 col-md-9 col-lg-10 p-4">
        <button
            className="btn btn-outline-primary d-md-none mb-3"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#mobileSidebar"
            aria-controls="mobileSidebar"
          >
            ☰ Menu
          </button>
        <Link to="/team" className="nav-link text-primary py-3">
          Back To Teams
        </Link>
        <div className="py-3">
          <h3>{getTeam?.name}</h3>
          <span>MEMBERS</span>
        </div>
        {getTeam?.members?.map((memberIdOrObj, index) => {
          const member =
            typeof memberIdOrObj === "string"
              ? members.find((m) => m._id === memberIdOrObj)
              : memberIdOrObj;

          if (!member) return null;

          return (
            <div className="d-flex gap-3" key={index}>
              <div
                className="rounded-circle text-white d-flex align-items-center justify-content-center fw-bold"
                style={{
                  width: "32px",
                  height: "32px",
                  fontSize: "0.75rem",
                  backgroundColor: "#f4a261",
                  border: "2px solid white",
                }}
                title={member.name}
              >
                {member.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .toUpperCase()}
              </div>
              <p>{member.name}</p>
            </div>
          );
        })}

        <button
          className="btn btn-primary mt-3"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
          data-bs-whatever="@mdo"
          type="button"
        >
          + Member
        </button>
        <div
          class="modal fade"
          id="exampleModal"
          tabindex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h1 class="modal-title fs-5" id="exampleModalLabel">
                  Add New Member
                </h1>
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div class="modal-body">
                <form onSubmit={handleAddMember}>
                  <div class="mb-3">
                    <label for="recipient-name" class="col-form-label">
                      Members Name:
                    </label>
                    <input
                      type="text"
                      class="form-control"
                      id="recipient-name"
                      placeholder="Member Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>

                  <div class="modal-footer">
                    <button
                      type="button"
                      class="btn btn-secondary"
                      data-bs-dismiss="modal"
                    >
                      Close
                    </button>
                    <button type="submit" class="btn btn-primary">
                      Add
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default TeamDetails;
