import React from "react";
import { Pagination } from "react-bootstrap";

const Pаgination = (props) => {
    let middlePagination;

    if (props.countPages <= 5) {
        middlePagination = [...Array(props.countPages)].map((_, index) => (
        <Pagination.Item key={index + 1} onClick={() => props.setPage(index + 1)} active={props.page === index + 1}>
            {index + 1}
        </Pagination.Item>
        ));
    } 
    else {
        const startValue = Math.floor((props.page - 1) / 5) * 5;
        middlePagination = (
            <>
                {[...Array(5)].map((_, index) => (
                    <Pagination.Item 
                        key={startValue + index + 1}
                        active={props.page === startValue + index + 1}
                        onClick={() => props.setPage(startValue + index + 1)}
                    >
                        {startValue + index + 1}
                    </Pagination.Item>
                ))}
                <Pagination.Ellipsis>...</Pagination.Ellipsis>
                <Pagination.Item onClick={() => props.setPage(props.countPages)}>{props.countPages}</Pagination.Item>
            </>
        );
        if (props.page > 5) {
            if (props.countPages - props.page >= 5) {
                middlePagination = (
                    <>
                        <Pagination.Item onClick={() => props.setPage(1)}>1</Pagination.Item>
                        <Pagination.Ellipsis>...</Pagination.Ellipsis>
                        <Pagination.Item onClick={() => props.setPage(startValue)}>{startValue}</Pagination.Item>
                        {[...Array(5)].map((_, index) => (
                            <Pagination.Item 
                                key={startValue + index + 1} 
                                active={props.page === startValue + index + 1} 
                                onClick={() => props.setPage(startValue + index + 1)}
                            >
                                {startValue + index + 1}
                            </Pagination.Item>
                        ))}
                        <Pagination.Ellipsis>...</Pagination.Ellipsis>
                        <Pagination.Item onClick={() => props.setPage(props.countPages)}>{props.countPages}</Pagination.Item>
                    </>
                );
            } 
            else {
                let countLeft = props.countPages - props.page + 5;
                middlePagination = (
                    <>
                        <Pagination.Item onClick={() => props.setPage(1)}>1</Pagination.Item>
                        <Pagination.Ellipsis>...</Pagination.Ellipsis>
                        <Pagination.Item onClick={() => props.setPage(startValue)}>{startValue}</Pagination.Item>
                        {[...Array(countLeft)].map((_, index) => (
                            <Pagination.Item 
                                key={startValue + index + 1} 
                                active={props.page === startValue + index + 1}
                                style={ props.countPages < startValue + index + 1 ? { display: "none" } : null } 
                                onClick={() => props.setPage(startValue + index + 1)}
                            >
                                {startValue + index + 1}
                            </Pagination.Item>
                        ))}
                    </>
                );
            }
        }
    }

    return (
        props.countPages > 1 && (
            <>
                <Pagination>
                    <Pagination.Prev onClick={() => props.setPage(props.page - 1)} disabled={props.page === 1}>Previous</Pagination.Prev>
                    {middlePagination}
                    <Pagination.Next onClick={() => props.setPage(props.page + 1)} disabled={props.page === props.countPages}>Next</Pagination.Next>
                </Pagination>
            </>
        )
    );
};

export default Pаgination;