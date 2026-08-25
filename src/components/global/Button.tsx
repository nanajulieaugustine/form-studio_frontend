const Button = ({children}: any) => {
    return ( 
        <button className="bg-(--secondary-color) text-(--background) rounded-full py-2 px-6">{children}</button>
     );
}
 
export default Button;