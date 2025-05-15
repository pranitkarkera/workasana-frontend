import { useDispatch, useSelector } from "react-redux";
import Sidebar from "../components/Sidebar";
import { useEffect, useState } from "react";
import { addNewTeam, fetchTeams } from "../slices/teamSlice";
import { Link } from "react-router-dom";

const Team = () => {
  const dispatch = useDispatch();
  const { teams, status } = useSelector((state) => state.teams);

  const MAX_VISIBLE = 3;
  const [name, setName] = useState("");
  const [members, setMembers] = useState(["", "", ""]);

  const handleAddTeam = (e) => {
    e.preventDefault();
    const teamData = {
      name,
      members,
    };

    dispatch(addNewTeam(teamData));

    setName("");
    setMembers(["", "", ""]);
    document.querySelector("#exampleModal .btn-close").click();
  };

  useEffect(() => {
    dispatch(fetchTeams());
  }, [dispatch]);

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
          <div className="d-flex py-3">
            <h2>Teams</h2>
            <button
              type="button"
              class="btn btn-primary ms-auto"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
              data-bs-whatever="@mdo"
            >
              + New Team
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
                      Create New Team
                    </h1>
                    <button
                      type="button"
                      class="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div class="modal-body">
                    <form onSubmit={handleAddTeam}>
                      <div class="mb-3">
                        <label for="recipient-name" class="col-form-label">
                          Team Name:
                        </label>
                        <input
                          type="text"
                          class="form-control"
                          id="recipient-name"
                          placeholder="Enter Team Name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                        />
                      </div>
                      <div class="mb-3">
                        <label for="message-text" class="col-form-label">
                          Add Members:
                        </label>
                        {members.map((member, index) => (
                          <input
                            key={index}
                            type="text"
                            className="form-control mt-3"
                            placeholder={`Member ${index + 1} Name`}
                            value={member}
                            onChange={(e) => {
                              const newMembers = [...members];
                              newMembers[index] = e.target.value;
                              setMembers(newMembers);
                            }}
                          />
                        ))}
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
                          Save Team
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {status === "loading" ? (
            <div
              className="d-flex justify-content-center align-items-center"
              style={{ height: "70vh" }}
            >
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : (
            <div className="row">
              {teams?.map((proj) => (
                <div key={proj._id} className="col-md-4 mb-3">
                  <div className="card p-3 bg-light border-0">
                    <h5 className="card-title">
                      <Link className="nav-link" to={`/team/${proj._id}`}>
                        {proj.name}
                      </Link>
                    </h5>

                    <div
                      className="d-flex align-items-center"
                      style={{ gap: "0.25rem" }}
                    >
                      {proj?.members
                        ?.slice(0, MAX_VISIBLE)
                        .map((member, index) => {
                          const name = member?.name;

                          // If name is not available, skip rendering this member
                          if (!name) return null;

                          const initials = name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")
                            .toUpperCase();

                          return (
                            <div
                              key={index}
                              className="rounded-circle text-white d-flex align-items-center justify-content-center fw-bold"
                              style={{
                                width: "32px",
                                height: "32px",
                                fontSize: "0.75rem",
                                backgroundColor: "#f4a261",
                                zIndex: MAX_VISIBLE - index,
                                marginLeft: index > 0 ? "-8px" : "0",
                                border: "2px solid white",
                              }}
                              title={name}
                            >
                              {initials}
                            </div>
                          );
                        })}

                      {proj?.members?.length > MAX_VISIBLE && (
                        <div
                          className="rounded-circle text-dark d-flex align-items-center justify-content-center fw-bold"
                          style={{
                            width: "32px",
                            height: "32px",
                            fontSize: "0.75rem",
                            backgroundColor: "#f0d5a0",
                            marginLeft: "-8px",
                            border: "2px solid white",
                            zIndex: 0,
                          }}
                          title={`+${proj.members.length - MAX_VISIBLE} more`}
                        >
                          +{proj.members.length - MAX_VISIBLE}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Team;
