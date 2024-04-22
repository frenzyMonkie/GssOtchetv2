const layoutSections =  [a, b, Greeting("Николай")]
ReactDOM.render(
    element(Fragment, {}, [...layoutSections] ), // Что будет рендериться
    document.getElementById("appContainer") // Куда будет рендериться
)

// var containers = document.querySelectorAll(".cfe-app")

// containers.forEach(function (domContainer) {
//     const userid = domContainer.dataset.userid
//     ReactDOM.render(
//         e(Layout, {userid: userid}), // Что будет рендериться
//         domContainer // Куда будет рендериться
//     )
// }
// )

// class HelloMessage extends React.Component {
//     render() {
//       return <div>Hello {this.props.name}</div>;
//     }
//   }

// ReactDOM.render(<HelloMessage name="Taylor" />);



