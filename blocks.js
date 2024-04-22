
const message = (fn, userid) => {
    return <h1> Ну здравствуй блок с идентификатором <span onClick={fn}>{userid}</span></h1>
};

// Собираем один лейаут из нескольких секций/блоков/элементов
class composeGivenBlocks extends React.Component {

    layout = (sections) => {
        var layout
        sections.forEach((val,idx) => {
            layout = <Fragment>{layout}{val}</Fragment>
        }) // Компилируем лэйаут из фрагментов
        return ( <Fragment> {layout} </Fragment> );
    }
    render () {
        return this.layout(this.props.sections)
    }
    // handleClick = () => {
    //     alert("Hello world")
    // }
    // structure = () => {
    //     const trigger = this.handleClick;
    //     const {userid} = this.props;
    //     const structure = <h1> Ну здравствуй блок с идентификатором <span onClick={trigger}>{userid}</span></h1>
    //     return structure
    // };
}

// Добавляем ко всем элементам указанного класса указанный лейаут
class insertIntoClassInstances extends React.Component {
    layout = (TAG, layout) => {
        var spanList = [...document.querySelectorAll("." + TAG)] // Ищем все элементы по указанному тегу класса

        // Проставляем всем указанный лейаут
        return dom = spanList.map((val,idx) => {
            return (
                <Fragment>
                {layout}
                </Fragment>
            ); // Лейаут тоже должен быть индивидуальным, это значит что нужны дополнительные параметры,
            // которые будут в цикле прописываться элементам,относящимся к разным модулям
            // или даже элементам списка
        })
    }
    render () {
        return this.layout(this.props.className, this.props.layout)
    }
}
