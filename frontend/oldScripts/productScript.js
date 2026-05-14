window.onload = () => {
    const user = JSON.parse(sessionStorage.getItem('user'));

    const backlink = document.getElementById('backLink');
    if (user && user.is_admin)  {
        document.getElementById('adminSection').style.display = 'block';
        backlink.href = '/admin_page'
    } else if (user){
        backlink.href = '/customer_page'
    } else {
        backlink.href = '/home'
        document.getElementById('kundvagn').style.display = 'block';
    }
}

const productInfo = async () => {
    const params = new URLSearchParams(window.location.search);
    const prod_id = params.get('prod_id');
}