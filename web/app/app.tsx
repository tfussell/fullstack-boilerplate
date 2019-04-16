import React from "react";
import ReactTable from "react-table";

import { Api } from "../api/api";

type UserWithStats = Api.User & {
  stats: Api.ILocationStats;
};

interface IAppState {
  users: UserWithStats[] | null;
}

export class App extends React.Component<{}, IAppState> {
  public state: IAppState = {
    users: null,
  };

  public componentDidMount() {
    this.load();
  }

  public render() {
    const { users } = this.state;

    return (
      <>
        { /* tslint:disable-next-line: max-line-length */ }
        <img className="logo" src="https://static1.squarespace.com/static/59f383abf9a61e71d5d01f5b/t/5c3a6e10aa4a9940172dad03/1547926663180/new%2Bbackground-1%2Bcopy.jpg" />
        <h1>Runner Geolocation Auditing</h1>
        <ReactTable
          data={users || []}
          loading={users === null}
          columns={[
            {
              Header: "Last Name",
              accessor: "lastName",
            },
            {
              Header: "First Name",
              accessor: "firstName",
            },
            {
              Cell: (props) => new Date(props.value).toLocaleDateString(),
              Header: "Signup Date",
              accessor: "signupDate",
              sortMethod(a, b) {
                  return new Date(a).getTime() - new Date(b).getTime();
              },
            },
            {
              Header: "Max Stale Time (s)",
              accessor: "stats.max",
            },
            {
              Header: "Average Stale Time (s)",
              accessor: "stats.average",
            },
            {
              Header: "Location Count",
              accessor: "stats.count",
            },
          ]}
          defaultSorted={[
            {
              desc: true,
              id: "stats.average",
            },
          ]}
          defaultPageSize={20}
          className="-striped -highlight"
        />
      </>
    );
  }

  private async load() {
    const users = await new Api.UsersService().get();
    const stats = await new Api.LocationsService().getStatsByUsers({
      userIds: users.map((u) => u.id),
    }) as {[key: string]: Api.ILocationStats};
    const usersWithStats = users.map((user) => ({
      ...user,
      stats: stats[user.id],
    }));
    this.setState({ users: usersWithStats });
  }
}
