// import Robot from '../models/robot';
import "./Home.css";

import React, { useEffect, useState } from "react";
import {
    addUniqueIdToTheData,
    collectAllMaterials,
    filterByMaterial,
} from "../utils/datahelper";

import Cart from "../components/Cart";
import MaterialSearch from "../components/MaterialSearch";
import ReactPaginate from "react-paginate";
import RobotList from "../components/RobotList";
import { callAPI } from "../api/helper";

type Robot = {
    name: string;
    price: string;
    image: string;
    material: string;
    createdAt: string;
    stock: number;
    id: number;
}

const robotsPerPage: number = 15;

const NewHome: React.FC = () => {

    // Initial robot data and for cart
    const [robotData, setRobotData] = useState<Robot[]>([]);
    const [cart, setCart] = useState<Robot[]>([]);
    const [fetchingAPIData, setFetchingAPIData] = useState<boolean>(false);
    // For Filtering
    const [materials, setMaterials] = useState<string[]>([]);
    const [filteredRobots, setFilteredRobots] = useState<Robot[]>([]);

    // For Paginated Robots
    const [currentRobots, setCurrentRobots] = useState<Robot[]>([]);
    const [pageCount, setPageCount] = useState<number>(0);
    const [robotOffset, setRobotOffset] = useState<number>(0);

    /* Life Cycle Methods */
    useEffect(() => {
        setFetchingAPIData(true);
        (async () => {
            const jsonObj = await callAPI();
            // Add UniqueID to the data
            const formattedData = await addUniqueIdToTheData(jsonObj);
            const listOfMaterials = await collectAllMaterials(jsonObj);

            const data = formattedData;
            // console.log("jsonObj Data, ", jsonObj)
            // console.log("data Data, ", data)

            // Retrieve the materials
            setRobotData(data);
            setMaterials(listOfMaterials);
            // Set initial Current Robots per page
        })();
    }, []);

    useEffect(() => {
        // Once the robot data has been fetched we can set the loading to false and start
        // populating the screen
        // console.log("robotData robotData, ", robotData)

        if (robotData.length > 0) {
            setFetchingAPIData(false);
            setUpCurrentRobotsPerPage();
        }
    }, [robotData]);


    useEffect(() => {
        // Only run this method if the robot data has already been populated:
        if (robotData.length > 0) {
            setUpCurrentRobotsPerPage();
        }
    }, [robotOffset, robotsPerPage]);

    // We want to set up the current robots per page for pagination
    const setUpCurrentRobotsPerPage = () => {
        const endOffset: number = robotOffset + robotsPerPage;
        setCurrentRobots(robotData.slice(robotOffset, endOffset));
        setPageCount(Math.ceil(robotData.length / robotsPerPage));
    };

    // Robot being added to cart
    // @ts-ignore
    const handleAddToCart = (robot: Robot) => {
        console.log("handleAddToCart ", robot)

        // Find if selected Robot is in the Cart list and the selected Robot from the Robot list
        const checkCartForItem = cart.find(
            (robotCart) => robotCart.id === robot.id
        );
        console.log("checkCartForItem ", checkCartForItem)

        const checkRobotDataForItem = robotData.find(
            (robotItem) => robotItem.id === robot.id
        );
        console.log("checkRobotDataForItem ", checkRobotDataForItem)

        const checkCurrentRobotDataForItem = currentRobots.find(
            (robotItem) => robotItem.id === robot.id
        );
        console.log("checkCurrentRobotDataForItem ", checkCurrentRobotDataForItem)

        const checkFilteredDataForItem = filteredRobots.find(
            (robotItem) => robotItem.id === robot.id
        );
        // Though unlikely to be called we will not add to cart if the stock is empty
        // @ts-ignore
        console.log("1");

        if (checkRobotDataForItem!.stock === 0) {
            console.log("2");

            return;
        }

        // If robot is in the cart then increase the stock by one, otherwise creeate a new robot in cart
        if (checkCartForItem) {
            console.log("3");

            setCart(
                cart.map((robotCart) =>
                    robotCart.id === robot.id
                        ? { ...checkCartForItem, stock: checkCartForItem.stock + 1 }
                        : robotCart
                )
            );
        } else {
            console.log("4");

            // Check Cart to see if more than 5 types exist
            if (cart.length > 4) {
                alert(
                    "You have reached the maximum number of Robots allowed for adding to the cart"
                );
                return;
            } else {
                setCart([...cart, { ...robot, stock: 1 }]);
            }
        }

        const newRobotData = robotData.map((robotItem) =>
            robotItem.id === robot.id
                ? {
                    ...checkRobotDataForItem!,
                    stock: checkRobotDataForItem!.stock - 1,
                }
                : robotItem
        )

        setRobotData(newRobotData)

        // This target would have to appear in this list too.

        const newRobots = currentRobots.map((robotItem) =>
            robotItem.id === robot.id
                ? {
                    ...checkCurrentRobotDataForItem!,
                    stock: checkCurrentRobotDataForItem!.stock - 1,
                }
                : robotItem

        )
        setCurrentRobots(newRobots)
        // We also want to update if we have filtered robots.
        if (checkFilteredDataForItem) {

            filteredRobots.map((robotItem) =>
                robotItem.id === robot.id
                    ? {
                        ...checkFilteredDataForItem,
                        stock: checkFilteredDataForItem.stock - 1,
                    }
                    : robotItem
            )
            setFilteredRobots(filteredRobots);
        }
    };


    // const handleRemoveFromCart: React.FC<{handleRemoveFromCart: (robot: Robot) => void }>
    // @ts-ignore
    const handleRemoveFromCart = (robot: Robot) => {
        console.log("Handle Remove from car", robot)
        // Find if selected Robot is in the Cart list and the selected Robot from the Robot list
        const checkCartForItem = cart.find(
            (robotCart) => robotCart.id === robot.id
        );
        const checkRobotDataForItem = robotData.find(
            (robotItem) => robotItem.id === robot.id
        );
        const checkCurrentRobotDataForItem = currentRobots.find(
            (robotItem) => robotItem.id === robot.id
        );
        const checkFilteredDataForItem = filteredRobots.find(
            (robotItem) => robotItem.id === robot.id
        );
        // We can check if the item being removed is 1, then we can remove the robot from the cart altogether.
        //  If not, then we just decrease the stock count by one.

        if (checkCartForItem!.stock === 1) {
            // Use filter to remove it from the cart
            setCart(cart.filter((robotCart) => robotCart.id !== robot.id));
        } else {

            const newCart = cart.map((robotCart) =>
                robotCart.id === robot.id
                    ? { ...checkCartForItem!, stock: checkCartForItem!.stock - 1 }
                    : robotCart
            )

            setCart(newCart)
        }
        // We then increase the robot count by one in the robot list.
        const newRobotData = robotData.map((robotItem) =>
            robotItem.id === robot.id
                ? {
                    ...checkRobotDataForItem!,
                    stock: checkRobotDataForItem!.stock + 1,
                }
                : robotItem
        )

        setRobotData(newRobotData)

        // This target would have to appear in this list too.

        if (currentRobots) {
            const newRobots = currentRobots.map((robotItem) =>
                robotItem.id === robot.id
                    ? {
                        ...checkCurrentRobotDataForItem!,
                        stock: checkCurrentRobotDataForItem!.stock + 1,
                    }
                    : robotItem

            )
            setCurrentRobots(newRobots)

        }

        // We also want to update if we have filtered robots.
        if (checkFilteredDataForItem) {
            setFilteredRobots(
                filteredRobots.map((robotItem) =>
                    robotItem.id === robot.id
                        ? {
                            ...checkFilteredDataForItem,
                            stock: checkFilteredDataForItem.stock + 1,
                        }
                        : robotItem
                )
            );
        }
    };

    // Handle when user click to request another page.

    const handlePageClick = (event: { selected: number }) => {
        console.log(
            `User requested page number ${event}`
        );
        const newOffset = (event.selected * robotsPerPage) % robotData.length;
        console.log(
            `User requested page number ${event.selected}, which is offset ${newOffset}`
        );
        setRobotOffset(newOffset);
    };

    // Handle the filtering of robots by material
    const handleSelectMaterial = async (material: string) => {
        if (material) {
            const getFilteredRobots = filterByMaterial(robotData, material);
            setFilteredRobots(getFilteredRobots);
        }
    };

    // It filter by material is reset
    const handleMaterialReset = (isReset: boolean) => {
        if (isReset) {
            setFilteredRobots([]);
        }
    };

    return (
        <div className="homeContainer">
            <div className="row">
                {/*Filter Row*/}
                <div className="col-sm-9">
                    {fetchingAPIData && <p>Fetching data ...</p>}
                    {!fetchingAPIData && robotData.length > 0 && materials.length > 0 && (
                        <React.Fragment>
                            <MaterialSearch
                                materials={materials}
                                handleSelectMaterial={handleSelectMaterial}
                                handleMaterialReset={handleMaterialReset}
                            />

                            {/*Robots Column*/}
                            <div className="productArea">
                                <RobotList
                                    robotData={
                                        filteredRobots.length > 0 ? filteredRobots : currentRobots
                                    }
                                    handleAddToCart={handleAddToCart}
                                />
                            </div>
                        </React.Fragment>
                    )}
                </div>

                {/*Cart Column*/}
                <div className="cartArea col-sm-6 col-md-3">
                    <Cart
                        cart={cart}
                        handleAddToCart={handleAddToCart}
                        handleRemoveFromCart={handleRemoveFromCart}
                    />
                </div>
            </div>
            <div className="row" style={{ margin: `20px` }}>
                {filteredRobots.length == 0 && (
                    <React.Fragment>
                        {currentRobots.length > 0 && (
                            <ReactPaginate
                                nextLabel=">"
                                onPageChange={handlePageClick}
                                pageRangeDisplayed={3}
                                marginPagesDisplayed={2}
                                pageCount={pageCount}
                                previousLabel="<"
                                pageClassName="page-robot"
                                pageLinkClassName="page-link"
                                previousClassName="page-robot"
                                previousLinkClassName="page-link"
                                nextClassName="page-robot"
                                nextLinkClassName="page-link"
                                breakLabel="..."
                                breakClassName="page-robot"
                                breakLinkClassName="page-link"
                                containerClassName="pagination"
                                activeClassName="active"
                                renderOnZeroPageCount={undefined}
                            />
                        )}
                    </React.Fragment>
                )}
            </div>
        </div>
    );

}

export default NewHome;


