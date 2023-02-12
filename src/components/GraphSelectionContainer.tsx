export default function GraphSelectionContainer(){
    return (<>
        <div className="filter-container bg-body-secondary">
            
            <h5 data-bs-toggle="collapse" data-bs-target="#graph-value-content" >Values</h5>
            <div id="graph-value-content">

                <div className="form-check-inline filter-item">
                    <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault"/>
                    <label className="form-check-label" htmlFor="flexCheckDefault">
                        Worldwide Gross
                    </label>
                </div>
                <div className="form-check-inline filter-item">
                    <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault"/>
                    <label className="form-check-label" htmlFor="flexCheckDefault">
                        Domestic Gross
                    </label>
                </div>
                <div className="form-check-inline filter-item">
                    <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault"/>
                    <label className="form-check-label" htmlFor="flexCheckDefault">
                        International Gross
                    </label>
                </div>
                <div className="form-check-inline filter-item">
                    <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault"/>
                    <label className="form-check-label" htmlFor="flexCheckDefault">
                        % of Domestic Gross
                    </label>
                </div>
                <div className="form-check-inline filter-item">
                    <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault"/>
                    <label className="form-check-label" htmlFor="flexCheckDefault">
                        Production Budget
                    </label>
                </div>
                <div className="form-check-inline filter-item">
                    <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault"/>
                    <label className="form-check-label" htmlFor="flexCheckDefault">
                        Running Time
                    </label>
                </div>
                <div className="form-check-inline filter-item">
                    <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault"/>
                    <label className="form-check-label" htmlFor="flexCheckDefault">
                        Rating
                    </label>
                </div>
            </div>
        </div>
        <style jsx>{`
            .filter-item{
                min-width:200px;
            }
            h5{
                cursor:pointer;
            }
            `}
        </style>
    </>)
}