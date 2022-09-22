const Spiner = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg"  style={{margin: '0 auto', background: 'none', display: 'block', }}
        width="200px" height="200px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
            <circle cx="50" cy="50" r="0" fill="none" stroke="#e50914" strokeWidth="5">
            <animate attributeName="r" repeatCount="indefinite" dur="1.3513513513513513s" values="0;43" keyTimes="0;1" keySplines="0 0.2 0.8 1" calcMode="spline" begin="0s"></animate>
            <animate attributeName="opacity" repeatCount="indefinite" dur="1.3513513513513513s" values="1;0" keyTimes="0;1" keySplines="0.2 0 0.8 1" calcMode="spline" begin="0s"></animate>
            </circle><circle cx="50" cy="50" r="0" fill="none" stroke="#221f1f" strokeWidth="5">
            <animate attributeName="r" repeatCount="indefinite" dur="1.3513513513513513s" values="0;43" keyTimes="0;1" keySplines="0 0.2 0.8 1" calcMode="spline" begin="-0.6756756756756757s"></animate>
            <animate attributeName="opacity" repeatCount="indefinite" dur="1.3513513513513513s" values="1;0" keyTimes="0;1" keySplines="0.2 0 0.8 1" calcMode="spline" begin="-0.6756756756756757s"></animate>
            </circle>
        </svg>
    )
}

export default Spiner;