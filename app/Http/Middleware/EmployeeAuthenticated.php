<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Auth;

class EmployeeAuthenticated
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
    public function handle(Request $request, Closure $next)
    {
        if( Auth::check() )
        {
            // if user is not employee take him to his dashboard
            if ( Auth::user()->isAdmin() ) {
                return redirect()->route('admin.dashboard');
            }

            // allow admin to proceed with request
            else if ( Auth::user()->isEmployee() ) {
                 return $next($request);
            }
        }

        return route('login');
    }
}
