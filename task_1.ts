import inquirer from 'inquirer';
import { fruits, vegetables, groceries } from './inventory.js';

// variable to store the customer items that are added to cart
let customerItemList: any[] = [];
// variable to store the customer name
let customerName: string = '';


console.log('Welcome to the grocery store!');
console.log('----------------------------');
const paymentMethod = ['Cash', 'Card'];
customerName = await saveCustomerName()
let option: number = 0;
// loop until the user selects exit option
while (option !== 6) {
    option = await categorySelection();

    if (option === 1) {
        await addItemToCart(fruits);
    } else if (option === 2) {
        await addItemToCart(vegetables);
    }
    else if (option === 3) {
        await addItemToCart(groceries);
    }
    else if (option === 4) {
        if (customerItemList.length === 0) {
            console.log('Your cart is empty');
        } else {
            console.table(customerItemList);
        }
    }
    else if (option === 5) {
        let result: boolean = await checkout();
        if (result) {
            option = await exitConfirmation();
        }

    }
    else {
        console.log('* Please enter a valid option\n');
    }



}
console.log('----------------------------');
console.log('Thank you for shopping with us!');

// function to save the customer name
async function saveCustomerName(): Promise<string> {
    let userInput = await inquirer.prompt({
        name: 'name',
        message: 'Enter Customer Name\n'
    });
    if (userInput.name) {
        return userInput.name;
    }
    else {
        console.log('* Please enter a valid name\n');
        return await saveCustomerName();
    }

}

// function to select the category like fruits, vegetables, groceries
async function categorySelection(): Promise<number> {
    let userInput = await inquirer.prompt({
        name: 'category',
        message: 'Please enter a number from 1 to 6 to select an action:\n1. Add fruits\n2. Add vegetables\n3. Add groceries\n4. View cart\n5. Checkout\n6. Exit',
        type: 'number'

    });
    if (userInput.category) {
        return userInput.category;
    }
    else {
        console.log('* Please enter a valid option\n');
        return await categorySelection();
    }
}


// function to add items to cart from the selected category

async function addItemToCart(itemList: any) {
    let selectedOption: number = 0;
    while (selectedOption !== -1) {
        console.table(itemList);
        let userInput = await inquirer.prompt([
            {
                name: 'item',
                message: 'Please enter the item id to add to cart \n Enter -1 to go back\n ',
                type: 'number'
            },
        ]);
        if (userInput.item === -1) {
            selectedOption = -1;
            break;
        }
        else if (userInput.item) {
            let item = itemList.find((item: any) => item.itemId === userInput.item);
            // check if the item is present in the list
            if (item) {
                //ask for quantity
                let userInput = await inquirer.prompt([
                    {
                        name: 'quantity',
                        message: 'Please enter the quantity',
                        type: 'number'
                    },
                ]);
                if (userInput.quantity) {
                    let selectedItem: any = {};
                    selectedItem = {
                        itemId: item.itemId,
                        itemName: item.itemName,
                        price: item.price,
                        quantity: userInput.quantity,
                        total: item.price * userInput.quantity

                    };
                    customerItemList.push(selectedItem);
                    console.log('___________________');
                    console.log('Item added to cart');
                    console.log('___________________');
                }
                else {
                    console.log('* You have not entered a valid quantity\n again select the item\n -------------');
                }
            }
            else {
                console.log('* Please enter a valid item id\n -------------');
            }
        } else {
            console.log('*Please enter a valid option\n -------------');
        }

    }
    return;
}


// function to checkout the items in cart and pay the amount

async function checkout(): Promise<boolean> {
    let selectedOption: number = 0;
    while (selectedOption !== -1) {
        console.log('Your cart:');
        console.table(customerItemList);
        let totalAmount = 0;
        let discount = 0;
        let payableAmount = 0;
        customerItemList.forEach((item: any) => {
            totalAmount += item.price * item.quantity;
        });
        if (totalAmount > 500) {
            discount = 0.1 * totalAmount;
            payableAmount = totalAmount - discount;
        } else if (totalAmount > 1000) {
            discount = 0.2 * totalAmount;
            payableAmount = totalAmount - discount;
        }
        else {
            payableAmount = totalAmount;
        }


        console.log(`Total amount: ${totalAmount}`);
        console.log(`Discount: ${discount}`);
        console.log(`Payable amount: ${payableAmount}`);
        let userInput = await inquirer.prompt([
            {
                name: 'paymentMethod',
                message: 'Please enter the payment method:\n1. Cash\n2. Card',
                type: 'number'
            },
        ]);
        if (userInput.paymentMethod === 1 || userInput.paymentMethod === 2) {

            let userPaymentInput = await inquirer.prompt([
                {
                    name: 'confirm',
                    message: 'Are you sure you want to pay the above amount?\n "yes" to confirm\n "no" to go back',
                    type: 'string'
                },
            ]);
            if (userPaymentInput.confirm === 'yes') {
                console.log(`${customerName} paid ${payableAmount} using ${paymentMethod[userInput.paymentMethod - 1]}`);
                customerItemList = [];
                customerName = '';
                selectedOption = -1;
                return true;
            }
            else if (userPaymentInput.confirm === 'no') {
                return false;

            }
            else {
                console.log('* Please enter a valid option \n -------------');
            }

        } else {
            console.log('* Please enter a valid option \n -------------');
        }

    }
    return false;
}

// function to ask the user to continue shopping or exit
async function exitConfirmation(): Promise<number> {

    let userInput = await inquirer.prompt([
        {
            name: 'option',
            message: 'Choose an option?\n 1. Another customer\n 2. Exit',
            type: 'number'
        },
    ]);
    if (userInput.option === 1) {
        customerName = await saveCustomerName();
        return 0;
    }
    else if (userInput.option === 2) {
        return 6;
    }
    else {
        console.log('Please enter a valid option \n -------------');
        return await exitConfirmation();
    }

}


