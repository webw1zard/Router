import { Link, Outlet, useParams } from "react-router-dom";

function Cabinet() {
  const { id } = useParams(); 

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-3 bg-primary text-white p-4">
          <h2 className="mb-4">Cabinet</h2>
          <ul className="list-unstyled">
            <li>
              <Link to={`/users/${id}/posts`} className="btn btn-dark w-100 mb-2">
                Posts
              </Link>
            </li>
            <li>
              <Link to={`/users/${id}/todos`} className="btn btn-dark w-100 mb-2">
                Todos
              </Link>
            </li>
            <li>
              <Link to={`/users/${id}/albums`} className="btn btn-dark w-100 mb-2">
                Albums
              </Link>
            </li>
          </ul>
        </div>
        <div className="col-md-9 p-4">
          <Outlet /> 
        </div>
      </div>
    </div>
  );
}

export default Cabinet;
