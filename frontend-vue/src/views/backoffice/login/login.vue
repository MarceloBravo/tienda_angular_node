<template>
    <div className="login-container">
        <GrupoAlertasComponent :alertas="alertas"/>
        <main className="d-flex w-100">
            <div className="container d-flex flex-column">
                <div className="row vh-100">
                    <div className="content-login col-sm-10 col-md-8 col-lg-6 mx-auto h-100">
                        <div className="d-table-cell align-middle login-form">

                            <div className="text-center mt-4">
                                <h1 className="h2">Bienvenido</h1>
                                <p className="lead">
                                Ingresa a tu cuenta para continuar
                                </p>
                            </div>

                            <div className="card">
                                <div className="card-body">
                                    <div className="m-sm-4">
                                        <form>
                                            <div className="mb-3">
                                                <label className="form-label" htmlFor="email">Email</label>
                                                <input className="form-control form-control-lg" type="email" id="email" placeholder="Ingresa tu email" v-model="email" @change="emailHandler"/>
                                            </div>
                                            <div className="mb-3">
                                                <label className="form-label" htmlFor="password">Contraseña</label>
                                                <input className="form-control form-control-lg" type="password" id="password" placeholder="Ingresa tu contraseña" v-model="password" @change="passwordHandler"/>
                                                <small>
                                                    <a href="index.html">¿Olvidastes tu contraseña?</a>
                                                </small>
                                            </div>
                                            <div>
                                                <label className="form-check" htmlFor="remember-me">
                                                    <input className="form-check-input" type="checkbox" value="remember-me" id="remember-me" v-model="remember" @keypress.enter="remenberChange"/>
                                                    <span className="form-check-label">
                                                        Recordarme la próxima ves
                                                    </span>
                                                </label>
                                            </div>
                                            <div className="text-center mt-3">
                                                <button
                                                    type="button"
                                                    className="btn btn-lg btn-primary"
                                                    @click="loginClick"
                                                >Ingresar
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </main>
    </div>
</template>

<style lang="scss">
  @import './login.scss';
</style>

<script>
    import Login from './login.js';
    export default Login
</script>